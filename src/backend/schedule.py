from course import Course,Instructor,Session
from typing import List




class Schedule():
    def __init__(self, 
                 stuid: int, 
                 coursePackages:List=None) -> None:
        self.__stuid = stuid
        self.__coursePackages = coursePackages # [course, lec_sess_no, tut_sess_no]
        self.__noFridayClass = False        # custom options
        self.__noMorningClass = False
        self.__noNoonClass = False
        print('Current Schedule:')
        self.listSchedule()

    @property
    def coursePackage(self):
        return self.__coursePackages
    
    def has_conflicts(self) -> bool:
        length = len(self.coursePackage)
        for i in range(length):
            s1 = self.coursePackage[i][0].searchSession(self.coursePackage[i][1])
            s2 = self.coursePackage[i][0].searchSession(self.coursePackage[i][2])
            assert(s1),f'No such course sessions: {self.coursePackage[i][1]}'
            course1_Session = [s1]
            if s2:
                course1_Session.append(s2)
            if course1_Session:
                for j in range(i,length):
                    s3 = self.coursePackage[i][0].searchSession(self.coursePackage[i][1])
                    s4 = self.coursePackage[i][0].searchSession(self.coursePackage[i][2])
                    assert(s3),f'No such course sessions: {self.coursePackage[i][1]}'
                    course2_Session = [s3]
                    if s4:
                        course2_Session.append(s4)
                    for a in course1_Session:
                        for b in course2_Session:
                            conflicts = a.has_conflicts(b)
                            if conflicts:
                                print(f'Time conflicts: {conflicts[0]} - {conflicts[1]}')
                                return False
        return True

    def has_conflicts(self,session:Session) -> bool:
        length = len(self.coursePackage)
        for i in range(length):
            s1 = self.coursePackage[i][0].searchSession(self.coursePackage[i][1])
            s2 = self.coursePackage[i][0].searchSession(self.coursePackage[i][2])
            assert(s1),f'No such course sessions: {self.coursePackage[i][1]}'
            course_Session = [s1]
            if s2:
                course_Session.append(s2) 
            for sess in course_Session:
                if sess.has_conflicts(session):
                    return True
        return False

    def addCoursePackage(self, coursePackage:List) -> None:
        course = coursePackage[0]
        lec_no = coursePackage[1]
        tut_no = coursePackage[2]
        # if course.get_full_code() in [c[0].get_full_code() for c in self.coursePackage]:
        #     print('You have choose a package of the course:', course.get_full_code(),course.course_name,sep= ' ')
        #     return
        assert lec_no,\
            "You have to choose a lecture session!"
        for l in course.lec_sessions:
            if l.session_no == lec_no:
                lec = l
                break
        if course.tut_sessions != None:
            assert tut_no,\
                "You have to choose a tutorial session!"
            for t in course.tut_sessions:
                if t.session_no == tut_no:
                    tut = t
                    break
        if not self.has_conflicts(lec) and not self.has_conflicts(tut):
            self.__coursePackages.append([lec,tut])

    def listSchedule(self):
        mon = 'Mon'.center(12,' ')
        tue = 'Tue'.center(12,' ')
        wed = 'Wed'.center(12,' ')
        thu = 'Thu'.center(12,' ')
        fri = 'Fri'.center(12,' ')

        print('+------------+------------+------------+------------+------------+')
        print('|{:1}|{:2}|{:3}|{:4}|{:5}|'.format(mon,tue,wed,thu,fri))
        print('+------------+------------+------------+------------+------------+')
        print('suanle,taiduole...')


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
    c.add_session(7,{t1, t2, jm}, 'tut', ('3 18:00', '3 19:20'))

    # Should raise an error because tutor t1 is in two sessions at the same time
    c.add_session(8,{t1}, 'tut', ('3 19:20', '3 20:50'))
    # Confirm sessions
    c.confirm_sessions()

    # Display course sessions

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

    sche = Schedule(118010154,[[c,1,6]])
    sche.addCoursePackage([c,2,7])