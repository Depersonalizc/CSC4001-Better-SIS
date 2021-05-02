from schedule import Schedule
import course
from course import Course, Instructor, Session
from typing import List




class Student():
    '''
    Class of student, contains the basic info of a student
    '''
    def __init__(self, 
                 stuid: int, 
                 name: str, 
                 school: str, 
                 major: str, 
                 year: int, 
                 tot_credit: int,                   # Maybe add major_tot_credit, GE_tot_credit ...
                 studied_courses: List[str],        # Use course code for reducing complexity and memory        
                 schedule: Schedule = None):
        '''
        Class Student:
        :param stuid int: student id
        :param name str: student name
        :param school str: school name
        :param major str: major abbr
        :param year int: year of study
        :param tot_credit int: current total credit units
        :param studied_courses List[str]: list of studied courses, use course code
        :param schedule Schedule: schedule of the student this semester
        '''
        self.__stuid = stuid
        self.__name = name
        self.__school = school
        self.__major = major
        self.__year = year
        # self.__GPA = 4.0
        self.__tot_credit = tot_credit
        self.__studied_courses = studied_courses
        self.__schedule = schedule


# properties and setters # no setter for stuid and name
    @property 
    def stuid(self):
        return self.__stuid

    @property 
    def name(self):
        return self.__name

    @property 
    def school(self):
        return self.__school

    @property 
    def major(self):
        return self.__major

    @property 
    def year(self):
        return self.__year

    @property 
    def tot_credit(self):
        return self.__tot_credit

    @property 
    def studied_courses(self):
        return self.__studied_courses

    @property 
    def schedule(self):
        return self.__schedule

    @school.setter
    def school(self, school: str):
        self.__school = school

    @major.setter
    def major(self, major: str):
        self.__major = major

    @tot_credit.setter
    def tot_credit(self, tot_credit: str):
        self.__tot_credit = tot_credit

    @studied_courses.setter
    def studied_courses(self, studied_courses: str):
        self.__studied_courses = studied_courses

    @schedule.setter
    def schedule(self, schedule: str):
        self.__schedule = schedule

# Methods
    def is_studied(self, course: str):
        return course in self.studied_courses

    def add_studied_courses(self, course: str):
        if self.is_studied():
            print('[WARN] The course is in the studied list already!')
            return
        self.studied_courses.append(course)
        self.tot_credit += course.credit_units
    
    def list_studied_courses(self):
        for c in self.studied_courses:
            print(c)

    def lookInto_studied_courses(self,course: str):
        idx = self.studied_courses.find(course)
        # db query and return info
        # initialize the course and show





