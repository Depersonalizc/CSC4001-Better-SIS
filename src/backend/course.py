

class Session():

    # A session of a course, atom of scheculing, contains info: session number,
    # course code, course name, start time, end time, instructor

    def __init__(self,sessionNum,class1,class2=None,instructor='') -> None: # enrollNum=0
        '''
            Parameters: 
            - sessionNum: int, primary key; 
            - class1,class2: list [startTime, endTime], one for tut, two for lec; 
            - instructor: string;
        '''
        self.__sessionNum = sessionNum
        # self.__code = code
        # self.__name = name
        # self.__start = startTime
        # self.__end = endTime
        self.__class1 = class1
        self.__class2 = class2
        self.__instructor = instructor

    def getSessionNum(self):
        return self.__sessionNum

    def getClass(self):
        lst = [self.__class1]
        if self.__class2 != None:
            lst.append(self.__class2)
        return lst

    def getInstructor(self):
        return self.__instructor

    def __lt__(self,other):
        return self.__sessionNum < other.__sessionNum
            
    def __eq__(self,other):
        return self.__sessionNum == other.__sessionNum

    def toString(self,noHead=False):
        # if not noHead:
            # print(self.__code,' ',self.__name)
        print('Session:\t',self.__class1,' ', self.__class2)
        
        print('Instructor: ',self.__instructor)
        print()

class Course():

# Course:
    # Attributes: all sessions, course name, course code,instructor, credit
    # Methods:
    # createSession()   add new sessions of the course
    # selectSession()   return a Session object
    # showSession()     print session info
    # toString()        print course info and all sessions

    def __init__(self,code,name,instructor,credit=3) -> None:
        '''
        Parameters:
        - code: int, course code;
        - name: string, course name;
        - instructor: string;
        - credit: int;
        '''
        self.__lectures = []
        self.__tutorials = []
        self.__name = name
        self.__code = code
        self.__instructor = instructor
        self.__credit = credit
    
    def createLecture(self, sessionNum,class1, class2=None,instructor='',isLecture=True):
        '''
        Parameters:
        - sessionNum: int, according to lec/tut, time... primary key of sessions;
        - class1, class2: list, [startTime,endTime]
        - instructor: string;
        - isLecture: bool;
        '''
        newSession = Session(sessionNum,class1,class2, instructor)
        if instructor not in self.__instructor:
            self.__instructor.append(instructor)
        exist = False
        if isLecture:
            if newSession not in self.__lectures:
                self.__lectures.append(newSession)
                self.__lectures.sort()
            else:
                exist = True
        else:
            if newSession not in self.__tutorials:
                self.__tutorials.append(newSession)
                self.__tutorials.sort()
            else:
                exist = True
        if exist:
            print('[ERROR] The same session exists:')
            newSession.toString()
            print()
            

    def selectSession(self,sessionNum,isLecture=True):
        if isLecture:
            for l in self.__lectures:
                if l.getSessionNum() == sessionNum:
                    return l
            # error
        else:
            for t in self.__tutorials:
                if t.getSessionNum() == sessionNum:
                    return t
            # error        

    def selectPackage(self, lecNum, tutNum=None):
        package = []
        if self.isLecture(lecNum):
            for l in self.__lectures:
                if l.getSessionNum() == lecNum:
                    package.append(l)
                    break
            # error
        else:
            pass #error

        if self.isTutorial(tutNum):
            for t in self.__tutorials:
                if t.getSessionNum() == tutNum:
                    package.append(t)
                    break
            # error
        else:
            pass #error
        if tutNum != None:
            if not checkTimeConflict(package[0],package[1]):
                return package
            else:
                pass # error
        
    # def deleteSession(self,sessionNum):
    #     for s in 
    def isLecture(self,sessionNum):
        pass
    def isTutorial(self,sessionNum):
        pass
    def showSession(self,sessionNum=None,noHead=False):
        if sessionNum != None:
            for s in self.__sessions:
                if s.getSessionNum() == sessionNum:
                    s.toString()
            return
        else:
            for s in self.__sessions:
                s.toString(noHead=noHead)

    def toString(self):
        print(self.__code,'\t', self.__name) 
        print('Credit:\t\t',self.__credit)
        self.showSession(noHead=True)


# Method: checkTimeConflict
# To check if two sessions have time confict using start/end time
def checkTimeConflict(session1, session2):
    assert(type(session1) == Session and type(session2) == Session)
    time1 = session1.getClass()
    time2 = session2.getClass()
    flag = False
    for t1 in time1:
        for t2 in time2:
            if t1[0] < t2[1] and t1[1] > t2[0]:
                flag = True
                return flag
    return flag


if __name__ == '__main__':
    c = Course('CSC4001','Software Engineering', credit=3)
    c.createSession(3,[1105,1120],[3105,3120],'Jane YOU')
    c.createSession(1,[1110,1120],[3110,3120],'Jane YOU')
    c.createSession(1,[1105,1120],[3105,3120],'Jane YOU')

    c.createSession(2,[1085,1100],[3085,3100],'Minming Li')
    c.toString()
    s1 = c.selectSession(3)
    s1.toString()
    s2 = c.selectSession(1)
    s1.toString()
    # print(checkTimeConflict(s2,s1))