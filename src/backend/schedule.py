from course import Course,Instructor,Session
from typing import List




class Schedule():
    def __init__(self, 
                 stuid: int, 
                 coursePackages:List=None,
                 courseList:List[Course]=None) -> None:
        self.__stuid = stuid
        self.__coursePackages = coursePackages # [course, lec_sess, tut_sess]
        self.__courseList = courseList
        self.__noFridayClass = False        # custom options
        self.__noMorningClass = False
        self.__noNoonClass = False
        if not self.__courseList and self.__coursePackages:
            self.__courseList = [c[0] for c in self.__coursePackages]
        self.listSchedule()

    @property
    def coursePackage(self):
        return self.__coursePackages
    
    def has_conflicts(self) -> bool:
        length = len(self.coursePackage)
        for i in range(length):
            s1 = self.coursePackage[i][1]
            s2 = None
            if len(self.coursePackage[i]) > 2:
                s2 = self.coursePackage[i][2]
            assert(s1),f'[ERROR] No such course sessions: {self.coursePackage[i][1]}'
            course1_Session = [s1]
            if s2:
                course1_Session.append(s2)
            if course1_Session:
                for j in range(i,length):
                    s3 = self.coursePackage[j][1]
                    s4 = None
                    if len(self.coursePackage[j]) > 2:
                        s4 = self.coursePackage[j][2]
                    assert(s3),f'[ERROR] No such course sessions: {self.coursePackage[j][1]}'
                    course2_Session = [s3]
                    if s4:
                        course2_Session.append(s4)
                    for a in course1_Session:
                        for b in course2_Session:
                            conflicts = a.has_conflicts(b)
                            if conflicts:
                                print(f'[ERROR] Time conflicts: {conflicts[0]} - {conflicts[1]}')
                                return False
        return True

    def has_conflicts(self,session:Session) -> bool:
        length = len(self.coursePackage)
        for i in range(length):
            s1 = self.coursePackage[i][1]
            s2 = None
            if len(self.coursePackage[i]) > 2:
                s2 = self.coursePackage[i][2]
            course_Session = [s1]
            if s2:
                course_Session.append(s2) 
            for sess in course_Session:
                if sess.has_conflicts(session):
                    return sess.has_conflicts(session)

    def addCoursePackage(self, coursePackage:List) -> None:
        course = coursePackage[0]
        lec_sess = coursePackage[1]
        tut_sess = None
        if len(coursePackage) > 2:
            tut_sess = coursePackage[2]

        if course.get_full_code() in [c[0].get_full_code() for c in self.coursePackage]:
            print('[ERROR] You have choose a package of the course:', course.get_full_code(),course.course_name,sep= ' ')
            return

        flag = False
        assert lec_sess,\
            "[ERROR] You have to choose a lecture session!"
        for l in course.lec_sessions:
            if l.session_no == lec_sess.session_no:
                flag = True
                break
        assert flag,"[ERROR] Wrong lecture session for this course!"
        flag = False
        if course.tut_sessions:
            assert tut_sess,\
                "[ERROR] You have to choose a tutorial session!"
            for t in course.tut_sessions:
                if t.session_no == tut_sess.session_no:
                    flag = True
                    break
            assert flag,"[ERROR] Wrong tut session for this course!"

        check1 = self.has_conflicts(lec_sess)
        check2 = None
        if tut_sess:
            check2 = self.has_conflicts(tut_sess)
        if not check1 and not check2:
            self.__coursePackages.append(coursePackage)
            self.__courseList.append(course)
            self.listSchedule()
            print()
        else:
            print('[ERROR] Conflicts found!')
            print(check1) if check1 else None
            print(check2) if check2 else None
            print('Add course has been rollbacked!\n  Pls check the conflict time!')
            print()

    def listSchedule(self):
        print('[INFO] Current Schedule:')
        for c in self.coursePackage:
            print(c[0].get_full_code(),' ',c[0].course_name)
            print(c[1].to_str(),'\n',c[2].to_str())

    def removeCoursePackage(self,courseFullCode:str):
        flag = False
        for c in self.coursePackage:
            if c[0].get_full_code() == courseFullCode:
                self.coursePackage.remove(c)
                flag = True
                break
        if not flag:
            print('[ERROR] <removeCoursePackage> No such course!')
        for c in self.__courseList:
            if c.get_full_code == courseFullCode:
                self.__courseList.remove(c)
                break
    def changeCourseSession(self,courseFullCode:str,session_no:int, session_type:str=None):
        for i in len(self.coursePackage):
            if self.coursePackage[i][0].get_full_code() == courseFullCode:
                s = self.coursePackage[i][0].findSess(session_no)
                if s.session_type == 'lec':
                    self.coursePackage[i][1] = s
                elif s.session_type == 'tut':
                    self.coursePackage[i][2] = s
        print('[ERROR] <changeCourseSession> No such course in the schedule!')
                    



if __name__ == '__main__':

 # Define courses and instructors
    CSC4001 = Course('CSC', 4001, 'Software Engineering', credit_units=3)
    jy = Instructor('Jane YOU',     'CSC', is_lecturer=True)
    jm = Instructor('Jane ME',      'CSC', is_lecturer=True)
    t1 = Instructor('Shiping ZHU',  'CSC', is_lecturer=False)
    t2 = Instructor('Haoxuan Che', 'CSC', is_lecturer=False)

    # Add lecture sessions
    CSC4001.add_session(1501,{jy}, 'lec', ('1 08:30', '1 09:50'), ('3 08:30', '3 09:50'))
    CSC4001.add_session(1502,{jy}, 'lec', ('2 08:30', '2 09:50'), ('4 10:30', '4 12:50'))
    CSC4001.add_session(1503,{jy}, 'lec', ('3 08:30', '3 09:50'), ('5 10:30', '5 12:50'))  # Conflicts with the session below
    CSC4001.add_session(1504,{jm}, 'lec', ('3 09:00', '3 10:20'), ('5 11:30', '5 13:50'))  # Conflicts with the session above

    # Add tutorial sessions
    CSC4001.add_session(1511,{t1, t2}, 'tut', ('2 19:30', '2 20:30'))
    CSC4001.add_session(1512,{t1, t2}, 'tut', ('3 19:30', '3 20:30'))
    CSC4001.add_session(1513,{t1, t2}, 'tut', ('5 19:00', '3 19:50'))

    # Should raise an error because tutor t1 is in two sessions at the same time
    CSC4001.add_session(1514,{t1}, 'tut', ('3 19:20', '3 20:50'))
    # Confirm sessions
    CSC4001.confirm_sessions()

    CSC3170 = Course('CSC', 3170, 'Database System', credit_units=3)

    cl = Instructor('Clement LEUNG',     'CSC', is_lecturer=True)
    t1 = Instructor('Haijin WANG',  'CSC', is_lecturer=False)
    t2 = Instructor('Songyang Ge', 'CSC', is_lecturer=False)

    CSC3170.add_session(1601,{cl},'lec',('1 10:30','1 11:50'),('3 10:30','3 11:50'))
    CSC3170.add_session(1602,{cl},'lec',('1 13:30','1 14:50'),('3 13:30','3 14:50'))
    CSC3170.add_session(1611,{t1,t2},'tut',('1 18:00','1 18:50'))
    CSC3170.add_session(1612,{t1,t2},'tut',('1 19:00','1 19:50'))
    CSC3170.add_session(1613,{t1,t2},'tut',('2 18:00','2 18:50'))
    CSC3170.add_session(1614,{t1,t2},'tut',('2 19:00','2 19:50'))

    DDA4250 = Course('DDA', 4250, 'Mathematic Introduction for Deep Learning', credit_units=3)

    AJ = Instructor('Arnulf Jentzen', 'SDS', is_lecturer=True)
    t1 = Instructor('Yushun Zhang',  'SDS', is_lecturer=False)

    DDA4250.add_session(1701,{cl},'lec',('2 15:30','2 17:20'),('5 20:00','5 21:50'))
    DDA4250.add_session(1711,{t1},'tut',('4 19:00','4 19:50'))

    CSC4008 = Course('CSC', 4008, 'Data Mining', credit_units=3)

    cw = Instructor('Chenye Wu', 'CSC', is_lecturer=True)
    t1 = Instructor('Kai Li',  'SDS', is_lecturer=False)
    t2 = Instructor('Chi Li',  'SDS', is_lecturer=False)

    CSC4008.add_session(1801,{cw},'lec',('2 13:30','2 14:50'),('4 13:30','4 14:50'))
    CSC4008.add_session(1802,{cw},'lec',('2 15:30','2 16:50'),('4 15:30','4 16:50'))
    CSC4008.add_session(1811,{t1,t2},'tut',('2 18:00','2 18:50'))
    CSC4008.add_session(1812,{t1,t2},'tut',('2 19:00','2 19:50'))
    CSC4008.add_session(1813,{t1,t2},'tut',('3 19:00','3 19:50'))


    sche = Schedule(118010154,[[CSC4001,CSC4001.findSess(1501),CSC4001.findSess(1511)],
    [CSC3170,CSC3170.findSess(1601),CSC3170.findSess(1614)]])
    print('\n\n')
    sche.addCoursePackage([DDA4250,DDA4250.findSess(1701),DDA4250.findSess(1711)])

    sche.addCoursePackage([CSC4008,CSC4008.findSess(1802),CSC4008.findSess(1811)]) # conflict
    sche.addCoursePackage([CSC4008,CSC4008.findSess(1801),CSC4008.findSess(1811)])
    sche.addCoursePackage([CSC4008,CSC4008.findSess(1802),CSC4008.findSess(1811)])

