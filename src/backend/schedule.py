from course import Course, Instructor, Session
from typing import List
from utils.printing import iter_to_str

# TODO
# 1. more custom options


# GLOCAL_CONST
MIN_CREDIT = 9                      # Min credit each semester
MAX_CREDIT = 18                     # Max credit each semester

class Preference:
    def __init__(self,
                 course_wishlist: List[Course] = None,
                 no_morning=False,
                 no_noon=False,
                 no_friday=False):

        self.course_wishlist = list()
        if course_wishlist is not None:
            self.course_wishlist = course_wishlist
        self.no_morning = no_morning
        self.no_noon = no_noon
        self.no_friday = no_friday

    def __str__(self):
        wishlist = 'Wish list - ' + '[' + \
                   ', '.join(c.full_code for c in self.course_wishlist) + ']'
        no_class = f'No morning classes - {self.no_morning}\n'  \
                   f'No noon classes - {self.no_noon}\n'        \
                   f'No Friday classes - {self.no_friday}\n'
        return wishlist + '\n' + no_class

    def add_to_wishlist(self, courses: List[Course]):
        self.course_wishlist.extend(
            c for c in courses if c not in self.course_wishlist
        )


class Package:
    def __init__(self, lec_session: Session, tut_session: Session):
        assert lec_session.session_type == 'lec' and \
               tut_session.session_type == 'tut' and \
               lec_session.course == tut_session.course, \
               'ERROR: Invalid package!'
        self.lec_sess = lec_session
        self.tut_sess = tut_session

    @property
    def course(self):
        return self.lec_sess.course

    # def is_valid(self):
    #     return self.lec_session.course == self.tut_session.course
    def __str__(self):
        sep = '------------------------------------'
        lec = self.lec_sess.to_str()
        tut = self.tut_sess.to_str(no_head=True)
        return '\n'.join([sep, lec, tut, sep])


class Schedule:
    def __init__(self,
                 stuid: int,
                 pref: Preference = None) -> None:
        """
        :param stuid (int): student ID
        :param pref (Preference): Preference for auto-scheduling system
        """

        # Student ID (to be replaced by Student object in the future)
        self._stuid = stuid
        # Currently selected packages by the student
        self._selected_pkgs = list()
        # Buffer area for autosched packages.
        # Note that packages selected will NOT be in the buffer
        self._buffer_pkgs = list()
        # Preference containing: Course wish list + personal setting
        self._preference = pref if pref is not None else Preference()
        # Perform an auto-scheduling
        self.auto_schedule(verbose=True)

    @property
    def selected_pkgs(self) -> List[Package]:
        return self._selected_pkgs

    # @selected_pkgs.setter
    # def selected_pkgs(self, pkgs):
    #     self._selected_pkgs = pkgs

    @property
    def buffer_pkgs(self) -> List[Package]:
        return self._buffer_pkgs

    @property
    def preference(self):
        return self._preference

    def __str__(self):
        selected = 'Selected:\n' + iter_to_str(self.selected_pkgs, sep='\n\n')
        auto_schedule = 'Auto-scheduled:\n' + iter_to_str(self.buffer_pkgs, sep='\n\n')
        pref = 'Preference:\n' + self._preference.__str__()
        return '\n'.join([selected, auto_schedule, pref])

    def session_violates_preference(self, sess: Session) -> bool:
        """
        Check if any class of a session violates any of `preference.no_xx`
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
                lec, tut = pkg.lec_sess, pkg.tut_sess
                if sess.overlaps_with_session(lec) or sess.overlaps_with_session(tut):
                    return True
        return False

    def find_selected_pkg(self, full_code: str) -> int:
        """
        Return index of selected package by comparing full code of course.
        Return -1 if not found.

        :param full_code: (str) Full code of course, e.g., 'CSC4001'
        :return: Package index if found, -1 otherwise
        """
        for i, pkg in enumerate(self.selected_pkgs):
            if pkg.course.full_code == full_code:
                return i
        print(f'Package of course {full_code} cannot be found!')
        return -1

    """
    TODO:
        Conflict checking in this method should be ensured by proper interface design 
        using `session_time_conflicts`. Separate the logic out?
        That is, users should not be able to form a package consisting of a session for
        which `session_time_conflicts` returning True.)
    """
    # def select_pkg(self, course_package: List):
    #     course = course_package[0]
    #     lec_sess = course_package[1]
    #     tut_sess = None
    #     if len(course_package) > 2:
    #         tut_sess = course_package[2]
    #
    #     if course.get_full_code() in [c[0].get_full_code() for c in self.course_package]:
    #         print('[ERROR] You have choose a package of the course:',
    #               course.get_full_code(), course.course_name, sep=' ')
    #         return
    #
    #     flag = False
    #     assert lec_sess,\
    #         "[ERROR] You have to choose a lecture session!"
    #     for l in course.lec_sessions:
    #         if l.session_no == lec_sess.session_no:
    #             flag = True
    #             break
    #     assert flag, "[ERROR] Wrong lecture session for this course!"
    #     flag = False
    #     if course.tut_sessions:
    #         assert tut_sess,\
    #             "[ERROR] You have to choose a tutorial session!"
    #         for t in course.tut_sessions:
    #             if t.session_no == tut_sess.session_no:
    #                 flag = True
    #                 break
    #         assert flag, "[ERROR] Wrong tut session for this course!"
    #
    #     check1 = self.has_conflicts(lec_sess)
    #     check2 = None
    #     if tut_sess:
    #         check2 = self.has_conflicts(tut_sess)
    #     if not check1 and not check2:
    #         self.__course_packages.append(course_package)
    #         self.__courseList.append(course)
    #         self.list_schedule()
    #         print()
    #     else:
    #         print('[ERROR] Conflicts found!')
    #         print(check1) if check1 else None
    #         print(check2) if check2 else None
    #         print('Add course has been rollbacked!\n  Pls check the conflict time!')
    #         print()

    def course_seleceted(self, course: Course) -> bool:
        """
        Return a boolean indicating whether a course (package) has been selected.
        """
        return any(True for selected in self.selected_pkgs
                   if selected.course == course)

    def select_pkg(self, pkg: Package):
        """
        Add a package to `selected_pkgs`, assuming package provided is conflict-free.
        (This should be ensured by proper interface design using `session_time_conflicts`.
        That is, users should not be able to form a package consisting of a session for
        which `session_time_conflicts` returning True.)
        TODO: Model related logic to ease work of frontend?
        :param pkg: (Package) Package to add to selection
        :return: (bool) Success status.
        """
        # if any(True for selected in self.selected_pkgs
        #        if selected.course == pkg.course):
        #     print('Course already selected!')
        #     return False
        self.selected_pkgs.append(pkg)
        # return True

    def remove_pkg(self, pkg_idx: int) -> bool:
        """
        Remove package given package index.

        :param pkg_idx: (int) Package index
        :return: (bool) Success status
        """
        try:
            del self.selected_pkgs[pkg_idx]
        except Exception as e:
            print(e)
            return False
        return True

    # TODO: Need Test
    def swap_session(self, pkg_idx: int,
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
               if course == pkg.course):
            return self._auto_schedule(course_idx+1)

        # Search valid packages of wished course.
        def no_conflicts(ss):
            return not (self.session_time_conflicts(ss, True) or
                        self.session_violates_preference(ss))
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
        self._buffer_pkgs = list()
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
        self._selected_pkgs += self.buffer_pkgs
        self._buffer_pkgs = list()


if __name__ == '__main__':

    # Instructors
    jy = Instructor('Jane YOU',       'CSC', is_lecturer=True)
    jm = Instructor('Jane ME',        'CSC', is_lecturer=True)
    cl = Instructor('Clement LEUNG',  'CSC', is_lecturer=True)
    aj = Instructor('Arnulf Jentzen', 'DDA', is_lecturer=True)
    cw = Instructor('Chenye Wu',      'CSC', is_lecturer=True)
    jw = Instructor('Jian WANG',      'SME', is_lecturer=True)

    t1 = Instructor('Songyang Ge',  'CSC', is_lecturer=False)
    t2 = Instructor('Yushun Zhang', 'SDS', is_lecturer=False)
    t3 = Instructor('Haijin WANG',  'CSC', is_lecturer=False)
    t4 = Instructor('Shiping ZHU',  'CSC', is_lecturer=False)
    t5 = Instructor('Haoxuan Che',  'CSC', is_lecturer=False)
    t6 = Instructor('Kai Li',       'SDS', is_lecturer=False)
    t7 = Instructor('Chi Li',       'SDS', is_lecturer=False)
    t8 = Instructor('Junyi GE',     'SME', is_lecturer=False)
    t9 = Instructor('Ang CHEN',     'SDS', is_lecturer=False)

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

    FIN4060 = Course('FIN', 4060, 'Supermarket Theory', credit_units=3)
    FIN4060.add_session(2000, {jw}, 'TC414', 'lec', ('2 13:30', '2 14:50'), ('4 13:30', '4 14:50'))
    FIN4060.add_session(2001, {jw}, 'TC414', 'lec', ('2 15:30', '2 16:50'), ('4 15:30', '4 16:50'))
    FIN4060.add_session(2020, {t8}, 'CD101', 'tut', ('1 18:00', '1 18:50'))
    FIN4060.add_session(2021, {t9}, 'CD101', 'tut', ('1 19:00', '1 19:50'))

    DDA4250 = Course('DDA', 4250, 'Mathematical Introduction to Deep Learning', credit_units=3)
    DDA4250.add_session(1701, {aj}, 'ZOOM', 'lec', ('2 15:30', '2 17:20'), ('5 20:00', '5 21:50'))
    DDA4250.add_session(1711, {t5}, 'ZOOM', 'tut', ('4 19:00', '4 19:50'))

    CSC4008 = Course('CSC', 4008, 'Data Mining', credit_units=3)
    CSC4008.add_session(1801, {cw}, 'TB103', 'lec', ('2 13:30', '2 14:50'), ('4 13:30', '4 14:50'))
    CSC4008.add_session(1802, {cw}, 'TB103', 'lec', ('2 15:30', '2 16:50'), ('4 15:30', '4 16:50'))
    CSC4008.add_session(1811, {t6, t7}, 'TD101', 'tut', ('2 18:00', '2 18:50'))
    CSC4008.add_session(1812, {t6, t7}, 'TD101', 'tut', ('2 19:00', '2 19:50'))
    CSC4008.add_session(1813, {t6, t7}, 'TD101', 'tut', ('3 19:00', '3 19:50'))

    print('Init schedule...')
    sche = Schedule(118020158)
    sche.preference.course_wishlist += [FIN4060, CSC4008]

    # Auto-scheduling
    sche.preference.no_friday = True
    sche.preference.no_morning = True
    print('Auto-scheduling...')
    sche.auto_schedule()
    print('Auto-scheduling DONE!')
    print(sche)
    sche.select_buffer_pkgs()
    print('Selecting auto-scheduled sessions...')
    print(sche)

    # Session swap
    # print(FIN4060)
    # Suppose student wants to swap to another tut session but not lec
    fin_pkg = sche.find_selected_pkg('FIN4060')
    lec_idx = FIN4060.find_session('lec', 2000)
    tut_idx = FIN4060.find_session('tut', 2021)
    if fin_pkg == -1:
        print("Can't find package named FIN4060")
    elif tut_idx == -1:
        print("Can't find tut session numbered 2021")
    else:
        print('Swapping tutorial...')
        if sche.swap_session(fin_pkg, tut_idx=tut_idx):
            print('Successful!')
        else:
            print('Failed!')
        print(sche)

    # Remove package
    print('Removing FIN4060 package...')
    if sche.remove_pkg(fin_pkg):
        print('Successful!')
    else:
        print('Failed!')
    print(sche)

    # Add package
    # TODO: First add package to buffer. Only add to selected_pkgs when user has confirmed!
    fin_pkg = Package(FIN4060.lec_sessions[lec_idx],
                      FIN4060.tut_sessions[tut_idx])
    print('Adding package...')
    sche.select_pkg(fin_pkg)
    print('Done!')
    print(sche)



    # sche = Schedule(118010154,[[CSC4001, cSC4001.session(1501), cSC4001.session(1511)],
    # [CSC3170, cSC3170.session(1601), cSC3170.session(1614)]])
    # print('\n\n')
    # sche.add_course_package([DDA4250,DDA4250.session(1701),DDA4250.session(1711)])

    # sche.add_course_package([CSC4008, cSC4008.session(1802), cSC4008.session(1811)]) # conflict
    # sche.add_course_package([CSC4008, cSC4008.session(1801), cSC4008.session(1811)])
    # sche.add_course_package([CSC4008, cSC4008.session(1802), cSC4008.session(1811)])

