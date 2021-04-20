from typing import List, Set, Tuple
from utils import *


class Instructor:
    def __init__(self, name: str, dept: str, is_lecturer: bool):
        self._name = name
        self._dept = dept
        self._is_lecturer = is_lecturer

    @property
    def name(self):
        return self._name

    @property
    def dept(self):
        return self._dept

    @property
    def is_lecturer(self):
        return self._is_lecturer


# TODO
# Add venue: TB102...

class Session:

    # A Session of a course (either lecture or tutorial), atom of scheduling
    # contains info: course pointer, instructors, session type, time slots of classes (1 and/or 2)

    def __init__(self,
                 session_no: int,   # primary key of a session
                 course,  # : Course
                 instructors: Set[Instructor],
                 venue: str,
                 session_type: str,
                 class1_ts: TimeSlot,
                 class2_ts: TimeSlot = None):
        """
        :param instructors (Set[Instructor]): set of instructors of the session
        :param venue (str): Venue of session (e.g., 'TA101')
        :param class1_ts (TimeSlot): time slot for first class in the week
        :param class2_ts (TimeSlot): time slot for second class in the week, if any
        :param session_type (type: str): 'lec' for lectures or 'tut' for tutorials
        """
        session_type = session_type.lower()
        assert session_type in ['lec', 'tut'], \
            'Session can only be "lec" or "tut"!'
        self.__session_type = session_type
        self.__course = course
        self.__class1 = class1_ts
        self.__class2 = class2_ts
        self.__instructors = instructors
        self.__venue = venue
        self.__session_no = session_no

    @property
    def session_no(self):  # here, directly use s.session_no, which is a list (s.session_no())
        return self.__session_no

    @session_no.setter
    def session_no(self, sno):
        self.__session_no = sno

    @property
    def course(self):
        return self.__course

    @property
    def class1(self) -> TimeSlot:
        return self.__class1

    @property
    def class2(self) -> TimeSlot:
        return self.__class2

    @property
    def classes(self) -> List[TimeSlot]:
        ret = [self.class1]
        if self.class2 is not None:
            ret.append(self.class2)
        return ret

    @property
    def instructors(self) -> Set[Instructor]:
        return self.__instructors

    @property
    def venue(self) -> str:
        return self.__venue

    @venue.setter
    def venue(self, new_venue):
        self.__venue = new_venue

    @property
    def session_type(self) -> str:
        return self.__session_type

    def overlaps_with_session(self, other) -> List[TimeSlot]:
        """
        Return all time conflicts with the other session
        """
        overlaps = [c1.overlap(c2) for c1 in self.classes
                                   for c2 in other.classes
                                   if c1.overlap(c2) is not None]
        return overlaps

    def sno_to_str(self) -> str:
        sno = str(self.session_no) if self.session_no is not None else 'XX'
        return sno.zfill(4) + '-' + self.session_type.upper()

    def to_str(self, no_head=False, show_sno=True, show_ins=True, show_venue=True) -> str:
        head = sno = ins = venue = ''
        if not no_head:
            head = f'{self.course.full_code} {self.course.course_name}'
        if show_sno:
            sno = self.sno_to_str()
        if show_ins:
            ins_type = {'lec': 'Lecturers',
                        'tut': 'Tutors'}[self.session_type]
            names = ', '.join(i.name for i in self.instructors)
            ins = f'{ins_type}: {names}'
        if show_venue:
            venue = 'Venue: ' + self.venue
        cls = iter_to_str(self.classes, sep='\n')
        string = '\n'.join((head, sno, ins, venue, cls))
        return string

    def __str__(self):
        return self.to_str()

    # def __lt__(self, other):
    #     return self.session_no < other.session_no
    #
    # def __gt__(self, other):
    #     return self.session_no > other.session_no
    #
    # def __eq__(self, other):
    #     return self.session_no == other.session_no


class Course:

    # Course:
    # Attributes: all sessions, course name, course code, instructors, credits
    # Methods:
    # add_session()   add new sessions of the course
    # ...

    def __init__(self,
                 dept: str,
                 course_code: int,
                 course_name: str,
                 credit_units: int = 3):
        """
        :param dept: letter initialization of the offering department (e.g. 'CSC') (type: str)
        :param course_code: integer course code (type: int)
        :param course_name: full name of the course (type: str)
        :param credit_units: units of credit offered (type: int)
        """
        self.__lec_sessions: List[Session] = list()
        self.__tut_sessions: List[Session] = list()
        self.__lecturers: Set[Instructor] = set()
        self.__tutors: Set[Instructor] = set()
        self.__dept = dept
        self.__course_code = course_code
        self.__course_name = course_name
        self.__credit_units = credit_units

    @property
    def lec_sessions(self) -> List[Session]:
        return self.__lec_sessions

    @property
    def tut_sessions(self) -> List[Session]:
        return self.__tut_sessions

    @property
    def dept(self) -> str:
        return self.__dept

    @property
    def course_code(self) -> int:
        return self.__course_code

    @property
    def course_name(self) -> str:
        return self.__course_name

    @property
    def credit_units(self) -> int:
        return self.__credit_units

    @property
    def lecturers(self) -> Set[Instructor]:
        return self.__lecturers

    @property
    def tutors(self) -> Set[Instructor]:
        return self.__tutors

    @property
    def full_code(self) -> str:
        return f'{self.dept}{self.course_code}'

    def add_instructors(self, instructors: Set[Instructor], session_type: str) -> None:
        """
        Add a set of instructors for the course.
        """
        assert session_type in ['lec', 'tut'],\
            "Session type can only be 'lec' or 'tut'!"
        if session_type == 'lec':
            self.__lecturers = self.lecturers.union(instructors)
        else:
            self.__tutors = self.tutors.union(instructors)

    # def has_conflict(self, session: Session, verbose: bool = False) -> bool:
    #     """
    #     Check time conflict with the other session against all existing sessions
    #
    #     :param session: Session to check for conflict against existing sessions (type: Session)
    #     :param session_type: 'lec' or 'tut' (type: str)
    #     :param verbose: Whether to display the conflicts (type: bool)
    #     :return (bool): Whether conflicts exist
    #     """
    #     has_conflict = False
    #     existing = {'lec': self.lec_sessions, 'tut': self.tut_sessions}
    #     for s in existing[session.session_type]:
    #         shared_instructors = s.instructors.intersection(session.instructors)
    #         overlaps = s.overlaps_with_session(session)
    #         # conflict if an instructor is in two concurrent sessions
    #         if shared_instructors and overlaps:
    #             has_conflict = True
    #             if verbose:
    #                 ins = ', '.join(i.name for i in shared_instructors)
    #                 print(f'WARNING: Failed to add session because instructor(s)\n'
    #                       f'{ins}\n'
    #                       f'has conflicting time slot(s) at:\n')
    #                 print(s)
    #     return has_conflict

    def _add_session(self, session: Session) -> None:
        # dirty trick for lists only ;)
        ss = {'lec': self.lec_sessions,
              'tut': self.tut_sessions}[session.session_type]
        # session.session_no = len(ss)
        ss.append(session)

    def add_session(self,
                    session_no: int,
                    instructors: Set[Instructor],
                    venue: str,
                    session_type: str,
                    class1: Tuple[str, str],
                    class2: Tuple[str, str] = None) -> None:
        """
        Add session to list given all related info.
        Session numbers are given in order of insertions.

        :param session_no: Session number to assign
        :param instructors: Set of instructors of the session (type: Set[Instructor...])
        :param venue: Venue of the session (type: str)
        :param session_type: 'lec' or 'tut' (type: str)
        :param class1: start and end time of first class of the week
                       in `%d %H:%M` format (type: Tuple[str, str])
        :param class2: start and end time of second class of the week (if any)
                       in `%d %H:%M` format (type: Tuple[str, str])
        """
        # Parse time slots
        try:
            class1_ts = TimeSlot(class1[0], class1[1])
            class2_ts = TimeSlot(class2[0], class2[1]) if class2 else None
        except:
            print(f'WARNING: Failed to parse times slots from strings: {class1}, {class2}')
        else:
            # Create new session, assuming no conflict exists
            new_session = Session(session_no, self,
                                  instructors, venue,
                                  session_type,
                                  class1_ts, class2_ts)
            self._add_session(new_session)
            self.add_instructors(instructors, session_type)

    def sort_sessions(self, lecs: bool = True, tuts: bool = True) -> None:
        """
        Sort sessions according to session numbers.

        :param lecs: Whether to sort lecture sessions
        :param tuts: Whether to sort tutorial sessions
        """
        if lecs:
            self.lec_sessions.sort(key=lambda sess: sess.session_no)
        if tuts:
            self.tut_sessions.sort(key=lambda sess: sess.session_no)

    def find_session(self, session_type: str, session_no: int) -> int:
        assert session_type in ('lec', 'tut'),\
            'Session can only be "lec" or "tut"!'
        ss = {'lec': self.lec_sessions,
              'tut': self.tut_sessions}[session_type]
        for idx, s in enumerate(ss):
            if s.session_no == session_no:
                return idx
        return -1

    def __str__(self):
        name = f'{self.full_code} {self.course_name}'
        sep = '=' * len(name)
        s_lecturers = '- Lecturer(s): ' + ', '.join((l.name for l in self.lecturers))
        s_tutors = '- Tutor(s): ' + ', '.join((t.name for t in self.tutors))
        cred = f'- Credit(s): {self.credit_units}\n'

        lecs = '-------------------Lectures-------------------\n'
        for lec_session in self.lec_sessions:
            lecs += lec_session.to_str(no_head=True) + '\n'

        tuts = '------------------Tutorials-------------------\n'
        for tut_session in self.tut_sessions:
            tuts += tut_session.to_str(no_head=True) + '\n'

        return '\n'.join(
            (sep, name, sep, s_lecturers, s_tutors, cred, lecs, tuts)
        )


if __name__ == '__main__':
    from utils.printing import iter_to_str

    # Define courses and instructors
    c = Course('CSC', 4001, 'Software Engineering', credit_units=3)
    jy = Instructor('Jane YOU',     'CSC', is_lecturer=True)
    jm = Instructor('Jane ME',      'CSC', is_lecturer=True)
    t1 = Instructor('Shiping ZHU',  'CSC', is_lecturer=False)
    t2 = Instructor('Yangsheng XU', 'CSC', is_lecturer=False)

    # Add lecture sessions
    c.add_session(1, {jy}, 'TA101', 'lec', ('1 08:30', '1 09:50'), ('3 10:30', '3 12:50'))
    c.add_session(2, {jy}, 'TA101', 'lec', ('2 08:30', '2 09:50'), ('4 10:30', '4 12:50'))
    c.add_session(
        3, {jy}, 'TA101', 'lec', ('3 08:30', '3 09:50'), ('5 10:30', '5 12:50')
    )  # Conflicts with the session below
    c.add_session(
        4, {jm}, 'TA102', 'lec', ('3 09:00', '3 10:20'), ('5 11:30', '5 13:50')
    )  # Conflicts with the session above

    # Add tutorial sessions
    c.add_session(1, {t1, t2}, 'TA101', 'tut', ('2 19:30', '2 20:30'))
    c.add_session(2, {t1, t2}, 'TA101',  'tut', ('3 19:30', '3 20:30'))
    c.add_session(3, {t1, t2, jm}, 'TA101', 'tut', ('3 18:00', '3 19:20'))

    # Display course sessions
    print(c)

    # Demo for conflict checking
    print('Conflict checking...')
    l0 = c.lec_sessions[0]
    l1 = c.lec_sessions[1]
    l2 = c.lec_sessions[2]
    l3 = c.lec_sessions[3]
    for l in l0, l1, l2:
        overlaps = l.overlaps_with_session(l3)
        if overlaps:  # List[TimeSlot]
            print("Conflicts found between:\n")
            print(l)
            print('\nAND\n')
            print(l3)
            print('\nwith overlapping time slots:')
            print(iter_to_str(overlaps, sep='\n'))
        else:  # Empty list
            print('No conflicts found!')
