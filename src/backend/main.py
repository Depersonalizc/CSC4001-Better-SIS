from schedule import Schedule
from student import Student
import course
from course import Course, Instructor, Session

# login ==> stuid & pwd

# stuid -> db -> pwd == pwd

# initialization of Student instance
# s = Student(stuid, name, school, major, year, tot_credit, studied_course, schedule)
s = Student('118010154','lyh','SDS','CSE', 3, 90, ['CSC4001'])