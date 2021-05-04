from course import Course, Instructor, Session
from typing import List, Union
from utils.printing import iter_to_str
from student import Student


# TODO
# 1. more custom options


# GLOBAL CONST
MIN_CREDIT = 9                      # Min credit each semester
MAX_CREDIT = 18                     # Max credit each semester


def sessions_compatible(lec_sess: Union[Session, None],
                        tut_sess: Union[Session, None]):
    """
    Check whether two sessions can form a package
    """
    if lec_sess is None and tut_sess is None:
        return True
    if lec_sess is None:
        return tut_sess.session_type == 'tut'
    elif tut_sess is None:
        return lec_sess.session_type == 'lec'
    else:
        return lec_sess.session_type == 'lec' and \
               tut_sess.session_type == 'tut' and \
               lec_sess.course.eq_course(tut_sess.course)


class Package:
    def __init__(self,
                 lec_session: Session = None,
                 tut_session: Session = None):
        assert sessions_compatible(lec_session, tut_session), \
            'ERROR: Sessions cannot form a package!'
        self.lec_sess = lec_session
        self.tut_sess = tut_session

    @property
    def course(self):
        if self.lec_sess is None and self.tut_sess is None:
            return None
        return self.lec_sess.course if self.lec_sess is not None \
            else self.tut_sess.course

    def is_complete(self):
        return self.lec_sess is not None and \
               self.tut_sess is not None

    def __str__(self):
        sep = '------------------------------------'
        lec = self.lec_sess.to_str() \
            if self.lec_sess is not None else 'Lec: [None]'
        tut = self.tut_sess.to_str(no_head=True) \
            if self.tut_sess is not None else 'Tut: [None]'
        return '\n'.join([sep, lec, tut, sep])


class Schedule:
    def __init__(self,
                 student: Student) -> None:
        """
        :param student (Student): User student
        """

        # User student, contains personal info and preferences
        self._student = student
        # Currently selected packages and their credit sum
        self._selected_pkgs = list()
        self._selected_credits = 0
        # Buffer area for autosched packages.
        # Note that packages already selected will NOT be in the buffer
        self._buffer_pkgs = list()

    @property
    def student(self) -> Student:
        return self._student

    @property
    def selected_pkgs(self) -> List[Package]:
        return self._selected_pkgs

    @property
    def selected_credits(self) -> int:
        return self._selected_credits

    @selected_credits.setter
    def selected_credits(self, c):
        self._selected_credits = c

    # @selected_pkgs.setter
    # def selected_pkgs(self, pkgs):
    #     self._selected_pkgs = pkgs

    @property
    def buffer_pkgs(self) -> List[Package]:
        return self._buffer_pkgs

    @property
    def preference(self):
        return self.student.preference

    def __str__(self):
        selected = f'SELECTED ({len(self.selected_pkgs)} packages, ' \
                   f'{self.selected_credits} units):\n' + \
                   iter_to_str(self.selected_pkgs, sep='\n\n')
        buffer = 'BUFFER:\n' + iter_to_str(self.buffer_pkgs, sep='\n\n')
        pref = 'PREFERENCE:\n' + self.student.preference.__str__()
        return '\n'.join([selected, buffer, pref])

    def empty_buffer(self):
        self._buffer_pkgs = list()

    def init_buffer(self):
        """
        Initialize package selection by filling the buffer with an empty package.
        Should be called each time a course page is opened
        """
        self._buffer_pkgs = [Package()]

    def empty_selected(self):
        self._selected_pkgs = list()

    def empty_wish_list(self):
        self.preference.empty_wish_list()

    def all_constraints(self):
        self.preference.all_constraints()

    def no_constraints(self):
        self.preference.no_constraints()

    def session_violates_constraints(self, sess: Session) -> bool:
        """
        Check if any class of a session violates any of constraints
        """
        pref = self.preference
        if pref.no_friday and any(True for c in sess.classes if c.is_friday()):
            return True
        if pref.no_morning and any(True for c in sess.classes if c.is_morning()):
            return True
        if pref.no_noon and any(True for c in sess.classes if c.is_noon()):
            return True
        # Add more...
        return False

    def session_time_conflicts(self, sess: Session, check_buffer=True) -> bool:
        """
        Check if a session has any time conflicts with `selected_pkgs`.
        If `check_buffer` is True, packages in `buffer_pkgs` are also checked.

        :param sess: (Session) session to check against
        :param check_buffer: (bool) whether to check `buffer_pkgs`
        """
        for pkgs in (self.selected_pkgs,
                     self.buffer_pkgs if check_buffer else []):
            for pkg in pkgs:
                for ss in pkg.lec_sess, pkg.tut_sess:
                    if ss is not None and sess.overlaps_with_session(ss):
                        return True
        return False

    def find_selected_pkg(self, full_code: str) -> int:
        """
        Return index of selected package by comparing full code of course.
        Return -1 if not found.
        Use selected_pkgs[i] to access the package

        :param full_code: (str) Full code of course, e.g., 'CSC4001'
        :return: Package index if found, -1 otherwise
        """
        for i, pkg in enumerate(self.selected_pkgs):
            if pkg.course.full_code == full_code:
                return i
        print(f'Package of the course {full_code} cannot be found!')
        return -1

    def remove_pkg(self, pkg_idx: int) -> bool:
        """
        Remove package given package index.

        :param pkg_idx: (int) Package index
        :return: (bool) Success status
        """
        credits = self.selected_pkgs[pkg_idx].course.credit_units
        try:
            del self.selected_pkgs[pkg_idx]
            self.selected_credits -= credits
        except Exception as e:
            print(e)
            return False
        return True

    def course_selected(self, course: Course) -> bool:
        """
        Return a boolean indicating whether a course (package) has been selected.
        """
        return any(True for selected in self.selected_pkgs
                   if course.eq_course(selected.course))

    def choose_session(self,
                       course: Course,
                       lec_idx: int = None,
                       tut_idx: int = None):
        """
        Choose lec or tut session for the (only) course package in buffer
        Lec index and tut index assumed valid; corresponding sessions conflict-free.
        :param course: Course of the package
        :param lec_idx: Lecture index
        :param tut_idx: Tutorial index
        """
        pkg = self.buffer_pkgs[0]  # Could be incomplete
        if lec_idx is not None:
            pkg.lec_sess = course.lec_sessions[lec_idx]
        if tut_idx is not None:
            pkg.tut_sess = course.tut_sessions[tut_idx]

    # TODO: Need Test
    def swap_session(self,
                     pkg_idx: int,
                     lec_idx: int = None,
                     tut_idx: int = None) -> bool:
        """
        Swap current sessions of `selected_pkgs[pkg_idx]` with the
        lecture session indicated by `lec_idx` (if given), and the
        tutorial session indicated by `tut_idx` (if given).

        :param pkg_idx: `selected_pkgs[pkg_idx]` == the course `pkg` to perform swap on
        :param lec_idx: `pkg.course.lec_sessions[lec_idx]` == the lecture session to swap to
        :param tut_idx: `pkg.course.tut_sessions[tut_idx]` == the tutorial session to swap to
        :return (bool): Whether the swap has succeeded
        """

        try:
            pkg = self.selected_pkgs[pkg_idx]  # package to swap
            course = pkg.course
            lec_swapto = pkg.lec_sess if lec_idx is None \
                else course.lec_sessions[lec_idx]
            tut_swapto = pkg.tut_sess if tut_idx is None \
                else course.tut_sessions[tut_idx]

            # Check all selected packages (except the package to be swapped)
            # against `lec_swapto` and `tut_swapto`. If no conflicts occur,
            # swapping can be performed.
            # TODO: Perform more tests for swappability. (e.g., quota,...)
            for i, package in enumerate(self.selected_pkgs):
                if i != pkg_idx:  # exclude the package to be swapped
                    for ss in package.lec_sess, package.tut_sess:
                        if (lec_swapto.overlaps_with_session(ss) or
                            tut_swapto.overlaps_with_session(ss)
                        ): return False
            # Also check `lec_swapto` and `tut_swapto` against
            # each other, just to be absolutely sure.
            if lec_swapto.overlaps_with_session(tut_swapto):
                return False

            # Can perform swapping!
            pkg.lec_sess = lec_swapto
            pkg.tut_sess = tut_swapto
            return True

        except Exception as e:
            print(e)
            return False

    def add_course_to_wishlist(self, course: Course):
        """
        Add course to wish list.
        If adding succeeds, return an empty list
        Else, return a list of all failing prerequisites
        """
        wishes = self.preference.course_wishlist
        assert course not in wishes, \
            f"ERROR: Course {course.full_code} already in wish list!"

        prereq_fails = [p for p in course.prereqs
                        if not self.student.has_taken(p)]
        if not prereq_fails:
            self.preference.course_wishlist.append(course)
        return prereq_fails

    # TODO: Need Test
    def _auto_schedule(self, course_idx: int) -> bool:
        """
        Recursively fill in the `buffer_pkgs` with packages of
        courses in `preference.course_wishlist`, in compliance with
        `preference.no_xx`. A boolean is returned indicating whether the
        auto-schedule was successful.

        :param course_idx: Index of the course in the wish list in current recursive step
        :return (bool): Whether auto-schedule was successful
        """
        # Base case: Scheduling succeeds
        wishlist = self.preference.course_wishlist
        if course_idx == len(wishlist):
            return True

        course = wishlist[course_idx]
        # Skip if wished course already in selected package.
        if any(True for pkg in self.selected_pkgs
               if course.eq_course(pkg.course)):
            return self._auto_schedule(course_idx+1)

        # Search valid packages of wished course.
        def no_conflicts(ss):
            return not (self.session_time_conflicts(ss, True) or
                        self.session_violates_constraints(ss))
        for lec in filter(no_conflicts, course.lec_sessions):
            for tut in filter(no_conflicts, course.tut_sessions):
                # Found valid package, append to auto-schedule.
                self.buffer_pkgs.append(Package(lec, tut))
                if self._auto_schedule(course_idx+1):
                    return True
                # Scheduling fails with this package, BACKTRACK.
                self.buffer_pkgs.pop()

        # Auto-scheduling fails pathetically.
        return False

    def auto_schedule(self, verbose=False) -> bool:
        """
        Wrapper function of the auto-scheduling routine
        """
        # Empty auto-scheduled packages
        self.empty_buffer()
        ret = self._auto_schedule(course_idx=0)
        if verbose:
            if ret:
                print('Auto-schedule completed successfully!')
            else:
                print('Fail to auto-schedule with current preference.')
                print('No modification was made to the schedules.')
            print(self)
        return ret

    def select_buffer_pkgs(self):
        """
        Add all packages from buffer to selected area.
        If adding succeeds, the buffer is emptied and an empty list is returned.
        If adding fails, a list of all incomplete packages is returned,
        """
        incomplete = [p for p in self.buffer_pkgs if not p.is_complete()]
        if not incomplete:
            self._selected_pkgs += self.buffer_pkgs
            self.selected_credits += sum(p.course.credit_units for p in self.buffer_pkgs)
            self.empty_buffer()
        return incomplete


if __name__ == '__main__':

    # Instructors
    jy = Instructor('Jane YOU',       'CSC', is_lecturer=True)
    jm = Instructor('Jane ME',        'CSC', is_lecturer=True)
    cl = Instructor('Clement LEUNG',  'CSC', is_lecturer=True)
    aj = Instructor('Arnulf Jentzen', 'DDA', is_lecturer=True)
    cw = Instructor('Chenye Wu',      'CSC', is_lecturer=True)
    jw = Instructor('Jian WANG',      'SME', is_lecturer=True)

    t1 = Instructor('Songyang Ge',    'CSC', is_lecturer=False)
    t2 = Instructor('Yushun Zhang',   'SDS', is_lecturer=False)
    t3 = Instructor('Haijin WANG',    'CSC', is_lecturer=False)
    t4 = Instructor('Shiping ZHU',    'CSC', is_lecturer=False)
    t5 = Instructor('Haoxuan Che',    'CSC', is_lecturer=False)
    t6 = Instructor('Kai Li',         'SDS', is_lecturer=False)
    t7 = Instructor('Chi Li',         'SDS', is_lecturer=False)
    t8 = Instructor('Junyi GE',       'SME', is_lecturer=False)
    t9 = Instructor('Ang CHEN',       'SDS', is_lecturer=False)

    CSC4001 = Course('CSC', 4001, 'Software Engineering', credit_units=3)
    CSC4001.add_session(1501, {jy}, 'TA101', 'lec', ('1 08:30', '1 09:50'), ('3 08:30', '3 09:50'))
    CSC4001.add_session(1511, {t1, t2}, 'TA101', 'tut', ('2 19:30', '2 20:30'))
    CSC4001.add_session(1512, {t1, t2}, 'TA101', 'tut', ('3 19:30', '3 20:30'))
    CSC4001.add_session(1513, {t1, t2}, 'TA101', 'tut', ('5 19:00', '5 19:50'))

    CSC3170 = Course('CSC', 3170, 'Database System', credit_units=3)
    CSC3170.add_session(1601, {cl}, 'TB202', 'lec', ('1 8:30', '1 8:50'), ('3 8:30', '3 8:50'))
    CSC3170.add_session(1602, {cl}, 'TB202', 'lec', ('2 9:30', '2 9:50'), ('4 9:30', '4 9:50'))
    CSC3170.add_session(1611, {t3, t4}, 'TB202', 'tut', ('1 18:00', '1 18:50'))
    CSC3170.add_session(1612, {t3, t4}, 'TB202', 'tut', ('1 19:00', '1 19:50'))
    CSC3170.add_session(1613, {t3, t4}, 'TB202', 'tut', ('2 18:00', '2 18:50'))
    CSC3170.add_session(1614, {t3, t4}, 'TB202', 'tut', ('2 19:00', '2 19:50'))

    FIN4060 = Course('FIN', 4060, 'Supermarket Theory', credit_units=3, prereqs={'CSC3170'})
    FIN4060.add_session(2000, {jw}, 'TC414', 'lec', ('2 13:30', '2 14:50'), ('4 13:30', '4 14:50'))
    FIN4060.add_session(2001, {jw}, 'TC414', 'lec', ('2 15:30', '2 16:50'), ('4 15:30', '4 16:50'))
    FIN4060.add_session(2020, {t8}, 'CD101', 'tut', ('1 18:00', '1 18:50'))
    FIN4060.add_session(2021, {t9}, 'CD101', 'tut', ('1 19:00', '1 19:50'))

    DDA4250 = Course('DDA', 4250, 'Mathematical Introduction to Deep Learning',
                     credit_units=3, prereqs={'CSC4001', 'CSC3170'})
    DDA4250.add_session(1701, {aj}, 'ZOOM', 'lec', ('2 15:30', '2 17:20'), ('5 20:00', '5 21:50'))
    DDA4250.add_session(1711, {t5}, 'ZOOM', 'tut', ('4 19:00', '4 19:50'))

    CSC4008 = Course('CSC', 4008, 'Data Mining', credit_units=3)
    CSC4008.add_session(1801, {cw}, 'TB103', 'lec', ('2 13:30', '2 14:50'), ('4 13:30', '4 14:50'))
    CSC4008.add_session(1802, {cw}, 'TB103', 'lec', ('2 15:30', '2 16:50'), ('4 15:30', '4 16:50'))
    CSC4008.add_session(1811, {t6, t7}, 'TD101', 'tut', ('2 18:00', '2 18:50'))
    CSC4008.add_session(1812, {t6, t7}, 'TD101', 'tut', ('2 19:00', '2 19:50'))
    CSC4008.add_session(1813, {t6, t7}, 'TD101', 'tut', ('3 19:00', '3 19:50'))

    # Student logs in and set preference
    print("Student login")
    stud = Student(stuid=118020158,
                   name='Test Student',
                   school='SDS',
                   major='CSE',
                   year=3,
                   tot_credit=100,
                   studied_courses={'CSC3170'})

    print('Init schedule...')
    sche = Schedule(stud)
    # Student wishes to add the following courses:
    for course in FIN4060, DDA4250, CSC4008:
        fails = sche.add_course_to_wishlist(course)
        if fails:
            print(f"Failed to wish-list {course.full_code}. Prerequisites {fails} not met.")
        else:
            print(f"Wish-listed course {course.full_code}.")
    sche.preference.no_friday = True

    # Auto-scheduling
    print('Auto-scheduling...')
    ret = sche.auto_schedule()
    print(f"Auto-scheduling {'DONE' if ret else 'FAILED'}!")
    print(sche)
    print('Selecting auto-scheduled sessions...')
    incomplete = sche.select_buffer_pkgs()
    if incomplete:
        print(f"Fails to select sessions in buffer. "
              f"Packages {incomplete} are incomplete!")
    else:
        print("Successful!")
    print(sche)

    # Session swap
    # print(FIN4060)
    # Suppose the student wants to swap to another tut session, but not lec
    pkg_toswap = 'FIN4060'
    pkg_idx = sche.find_selected_pkg(pkg_toswap)
    lec_idx = FIN4060.find_session('lec', 2000)
    tut_idx = FIN4060.find_session('tut', 2021)
    if pkg_idx == -1:
        print(f"Can't find package named {pkg_toswap}")
    elif tut_idx == -1:
        print("Can't find tut session numbered 2021")
    else:
        print('Swapping tutorial...')
        if sche.swap_session(pkg_idx, tut_idx=tut_idx):
            print('Successful!')
        else:
            print('Failed!')
        print(sche)

    # Remove package
    pkg_to_remove = sche.find_selected_pkg(pkg_toswap)
    print('Removing FIN4060 package...')
    print('Successful!' if sche.remove_pkg(pkg_to_remove) else 'Failed!')
    print(sche)

    # Manual add (say FIN4060)
    sche.init_buffer()
    sche.choose_session(FIN4060, lec_idx=lec_idx)
    # Cannot select package cuz it is incomplete
    print('Selecting package...')
    incomplete = sche.select_buffer_pkgs()
    if incomplete:
        print(f"Fails to select sessions in buffer as it contains incomplete packages.")
    else:
        print("Successful!")
    # Now it is complete
    sche.choose_session(FIN4060, tut_idx=tut_idx)
    print('Selecting package...')
    incomplete = sche.select_buffer_pkgs()
    if incomplete:
        print(f"Fails to select sessions in buffer as it contains incomplete packages.")
    else:
        print("Successful!")

    print(sche)

