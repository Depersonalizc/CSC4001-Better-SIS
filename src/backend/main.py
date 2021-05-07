from schedule import Schedule
from student import Student,Preference
from course import Course, Instructor, Session
import DB.dbModels as dbMdl
from DB.dbModels import db
from data_insertion import data_insert
from get_instance import get_student, get_course, courses, instructors, students


ALPHABETS = 'abcdefghijklmnopqrstuvwxyz'
DIGITS = '0123456789'






'''
1.LOGIN
'''

# login ==> stuid & pwd

# stuid -> db -> pwd == pwd

# Initialization of Schedule and Student instance

# schedule = Schedule()

# s = Student(stuid, name, school, major, year, tot_credit, studied_course, schedule)
# s = Student('118010154', 'lyh', 'SDS', 'CSE', 3, 90, ['CSC4001'])

'''
2. ENTER PROFILE PAGE
'''
# Can view studied courses here

# View one, initialize one, plus student Grade point 

'''
3. SEARCH COURSE
'''

# Query a category of courses

# Initialize these courses together
# Show basic info of coutses

'''
4. COURSE PAGE
'''

# Call Course methods and Schedule Methods


'''
5. 
'''


if __name__ == '__main__':
    data_insert()
    get_course('CSC4001')
    get_student('118010154')
    #create_new_student('118010154', 'lyh', '123', 'SDS', 'CSE', 3, 90, ['CSC4001'])
    s = dbMdl.Student.query.filter_by(id='118010154').first()
    print(s.name)
    print(', '.join(str(c) for c in courses))
    print(', '.join(str(i) for i in instructors))
