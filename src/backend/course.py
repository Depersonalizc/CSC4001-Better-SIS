from typing import List, Set, Tuple
from utils.time_utils import TimeOfWeek, TimeSlot


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
                 session_no: int, # primary ksy of a session
                 course_code:str,  #: Course
                 course_name:str,
                 instructors: Set[Instructor],
                 session_type: str,
                 class1_ts: TimeSlot,
                 class2_ts: TimeSlot = None):
        """
        :param instructors: set of instructors of the session (type: Set[Instructor])
        :param class1_ts: time slot for first class in the week (type: TimeSlot)
        :param class2_ts: time slot for second class in the week, if any (type: TimeSlot)
        :param session_type: 'lec' for lectures, 'tut' for tutorials (type: str)
        """
        session_type = session_type.lower()
        assert session_type in ['lec', 'tut'], \
            'Session can only be "lec" or "tut"!'
        self.__session_type = session_type
        self.__course_info = [course_code,course_name]
        self.__class1 = class1_ts
        self.__class2 = class2_ts
        self.__instructors = instructors
        self.__session_no = session_no

    @property
    def session_no(self):                               # here, directly use s.session_no, which is a list (s.session_no())
        return self.__session_no

    @session_no.setter
    def session_no(self, sno):
        self.__session_no = sno

    @property
    def course_info(self):
        return self.__course_info

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
    def session_type(self) -> str:
        return self.__session_type

    def overlaps_with_session(self, other) -> List[TimeSlot]:
        """
        Return all time conflict with the other session
        """
        overlaps = [c1.overlap(c2) for c1 in self.classes
                                   for c2 in other.classes
                                   if c1.overlap(c2) is not None]
        return overlaps

    def has_conflicts(self, other) -> bool:
        if self.overlaps_with_session(other):
            return [self.session_no, self.classes ,other.session_no,other.classes]
        # return True if self.overlaps_with_session(self, other) != None else False

    def sno_to_str(self) -> str:
        sno = str(self.session_no) if self.session_no is not None else 'XX'
        return sno.zfill(4) + '-' + self.session_type.upper()

    def to_str(self, no_head=True) -> str:
        head = '' if no_head else \
            f'{self.course_info[0]} {self.course_info[1]}\n'
        sno = self.sno_to_str() + '\n'
        ins = 'Instructors: ' + ', '.join(i.name for i in self.instructors) + '\n'
        cls = ''.join(c.__repr__() for c in self.classes)
        return head + sno + ins + cls

    def __repr__(self):
        return self.to_str(no_head=False)

    def __lt__(self, other):
        return self.session_no < other.session_no

    def __gt__(self, other):
        return self.session_no > other.session_no

    def __eq__(self, other):
        return self.session_no == other.session_no


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

    def get_full_code(self) -> str:
        return f'{self.dept}{self.course_code}'

    def add_instructors(self, instructors: Set[Instructor], session_type: str) -> None:
        assert session_type in ['lec', 'tut'],\
            "Session type can only be 'lec' or 'tut'!"
        if session_type == 'lec':
            self.__lecturers = self.lecturers.union(instructors)
        else:
            self.__tutors = self.tutors.union(instructors)

    def has_conflict(self, session: Session, verbose: bool = False) -> bool:
        """
        Check time conflict with the other session against all existing sessions

        :param session: Session to check for conflict against existing sessions (type: Session)
        :param session_type: 'lec' or 'tut' (type: str)
        :param verbose: Whether to display the conflicts (type: bool)
        :return (bool): Whether conflicts exist
        """
        has_conflict = False
        # existing = {'lec': self.lec_sessions, 'tut': self.tut_sessions}
        # for s in existing[session.session_type]:

        # FIX:
        # fix for special case: GE courses, an instructor teaches both lec and tut       XD
        existing = self.lec_sessions.copy()                 # copy() or error
        if self.tut_sessions:
            existing += self.tut_sessions
        for s in existing:
            shared_instructors = s.instructors.intersection(session.instructors)
            overlaps = s.overlaps_with_session(session)
            # conflict if an instructor is in two concurrent sessions
            if shared_instructors and overlaps:
                if verbose:
                    ins = ', '.join(i.name for i in shared_instructors)
                    print(f'WARNING: Failed to add session because instructor(s)\n'
                          f'{ins}\n'
                          f'has conflicting time slot(s) at:\n')
                    print(s)
                    has_conflict = True
        return has_conflict

    def _add_session(self, session: Session) -> None:
        # dirty trick for lists only ;)
        ss = {'lec': self.lec_sessions,
              'tut': self.tut_sessions}[session.session_type]
        # session.session_no = len(ss)
        ss.append(session)

    def add_session(self,
                    session_no: int,
                    instructors: Set[Instructor],
                    session_type: str,
                    class1: Tuple[str, str],
                    class2: Tuple[str, str] = None) -> None:
        """
        Add session to list given all related info.
        Session numbers are given in order of insertions.

        :param instructors: Set of instructors of the session (type: Set[Instructor...])
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
            print('WARNING: Failed to parse times slots.')
        else:
            # Create new session
            new_session = Session(session_no,self.get_full_code(),self.course_name,instructors, session_type, class1_ts, class2_ts)
            if self.has_conflict(new_session, verbose=True):
                return
            self._add_session(new_session)
            self.add_instructors(instructors, session_type)

    def confirm_sessions(self, lecs: bool = True, tuts: bool = True) -> None:
        """
        Confirm results of session adding, sort sessions according
        to start time of class1 and assign session numbers in sequence.

        :param lecs: Whether to confirm lecture sessions
        :param tuts: Whether to confirm tutorial sessions
        """
        if lecs:
            self.lec_sessions.sort(key=lambda sess: sess.session_no)
            # for i, lec in enumerate(self.lec_sessions):
            #     lec.session_no = i
        if tuts:
            self.tut_sessions.sort(key=lambda sess: sess.session_no)
            # for i, tut in enumerate(self.tut_sessions):
            #     tut.session_no = i

    def session(self, session_no:int) -> Session:
        for s in self.lec_sessions:
            if s.session_no == session_no:
                return s
        for s in self.tut_sessions:
            if s.session_no == session_no:
                return s
        print(f'No such Sessions: {session_no}')

    def __repr__(self):
        name = f'\n{self.get_full_code()} {self.course_name}\n'
        s_lecturers = '- Lecturer(s): ' + ', '.join((l.name for l in self.lecturers)) + '\n'
        s_tutors = '- Tutor(s): ' + ', '.join((t.name for t in self.tutors)) + '\n'
        cred = f'- Credit(s): {self.credit_units}\n\n'

        lecs = '-------------------Lectures-------------------\n'
        for lec_session in self.lec_sessions:
            lecs += lec_session.to_str(no_head=True) + '\n'

        tuts = '------------------Tutorials-------------------\n'
        for tut_session in self.tut_sessions:
            tuts += tut_session.to_str(no_head=True) + '\n'

        return name + s_lecturers + s_tutors + cred + lecs + tuts


if __name__ == '__main__':

    # Define courses and instructors
    c = Course('CSC', 4001, 'Software Engineering', credit_units=3)
    jy = Instructor('Jane YOU',     'CSC', is_lecturer=True)
    jm = Instructor('Jane ME',      'CSC', is_lecturer=True)
    t1 = Instructor('Shiping ZHU',  'CSC', is_lecturer=False)
    t2 = Instructor('Yangsheng XU', 'CSC', is_lecturer=False)

    # Add lecture sessions
    c.add_session(1,{jy}, 'lec', ('1 08:30', '1 09:50'), ('3 10:30', '3 12:50'))
    c.add_session(2,{jy}, 'lec', ('2 08:30', '2 09:50'), ('4 10:30', '4 12:50'))
    c.add_session(3,{jy}, 'lec', ('3 08:30', '3 09:50'), ('5 10:30', '5 12:50'))  # Conflicts with the session below
    c.add_session(4,{jm}, 'lec', ('3 09:00', '3 10:20'), ('5 11:30', '5 13:50'))  # Conflicts with the session above

    # Add tutorial sessions
    c.add_session(5,{t1, t2}, 'tut', ('2 19:30', '2 20:30'))
    c.add_session(6,{t1, t2}, 'tut', ('3 19:30', '3 20:30'))
    c.add_session(7,{t1, t2, jm}, 'tut', ('3 18:00', '3 19:20'))  # Conflicts with the session above

    # Should raise an error because tutor t1 is in two sessions at the same time
    c.add_session(8,{t1}, 'tut', ('3 19:20', '3 20:50'))
    # Confirm sessions
    c.confirm_sessions()

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
            print("Conflicts found at:")
            print(l)
            print(l3)
            print(
                ''.join(ts.__repr__() for ts in overlaps)
            )
        else:  # Empty list
            print('No conflicts found!')
