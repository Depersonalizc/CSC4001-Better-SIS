from schedule import Schedule
from student import Student
import course
from course import Course, Instructor, Session
import DB.dbModels as dbMdl
from DB.dbModels import db

ALPHABETS = 'abcdefghijklmnopqrstuvwxyz'
DIGITS = '0123456789'

# Global variables
courses = instructors = dict()

db.drop_all()
db.create_all()

# CSC4001 = Course('CSC', 4001, 'Software Engineering', credit_units=3)
# CSC4001.add_session(1501, {jy}, 'TA101', 'lec', ('1 08:30', '1 09:50'), ('3 08:30', '3 09:50'))
# CSC4001.add_session(1511, {t1, t2}, 'TA101', 'tut', ('2 19:30', '2 20:30'))
# CSC4001.add_session(1512, {t1, t2}, 'TA101', 'tut', ('3 19:30', '3 20:30'))
# CSC4001.add_session(1513, {t1, t2}, 'TA101', 'tut', ('5 19:00', '5 19:50'))
#
# CSC3170 = Course('CSC', 3170, 'Database System', credit_units=3)
# CSC3170.add_session(1601, {cl}, 'TB202', 'lec', ('1 8:30', '1 8:50'), ('3 8:30', '3 8:50'))
# CSC3170.add_session(1602, {cl}, 'TB202', 'lec', ('2 9:30', '2 9:50'), ('4 9:30', '4 9:50'))
# CSC3170.add_session(1611, {t3, t4}, 'TB202', 'tut', ('1 18:00', '1 18:50'))
# CSC3170.add_session(1612, {t3, t4}, 'TB202', 'tut', ('1 19:00', '1 19:50'))
# CSC3170.add_session(1613, {t3, t4}, 'TB202', 'tut', ('2 18:00', '2 18:50'))
# CSC3170.add_session(1614, {t3, t4}, 'TB202', 'tut', ('2 19:00', '2 19:50'))

c = dbMdl.Course(code='CSC4001', name='Software Engineering', school='SDS',
                 units=3, prereqs='MAT1001 MAT1002')
lec = dbMdl.Session('10001', course_code='CSC1001', type='lec', )
tut = dbMdl.Session('10002', course_code='CSC1001', type='tut')
db.session.add(c)
db.session.add(lec)
db.session.add(tut)


def get_course(full_code: str):
    for i, c in enumerate(full_code):
        if c.isdigit():
            break
    dept, code = full_code[:i], int(full_code[i:])

    # Fetch course and session info from local
    if full_code in courses:
        return courses[full_code]

    # Fetch course and session info from db
    c = dbMdl.Course.query.filter_by(code=full_code).first()
    ss = dbMdl.Session.query.filter_by(course=full_code).all()
    if c is None:
        return c
    # create Course instance
    prereqs = {p for p in c.prereqs.split(' ')}
    comment = None  # TODO: Fetch and create Comment instance
    course = Course(dept, code, c.name, c.units, prereqs, comment)
    courses[full_code] = course

    ins = set()
    for s in ss:
        class1 = tuple(t for t in s.class1)
        class2 = tuple(t for t in s.class2) if s.class2 else None
        course.add_session(s.sno, ins, s.venue, s.type, class1, class2)

    return course
    # print()
    # print(s.course)

'''
1.LOGIN
'''

# login ==> stuid & pwd

# stuid -> db -> pwd == pwd

# Initialization of Schedule and Student instance

# schedule = Schedule()

# s = Student(stuid, name, school, major, year, tot_credit, studied_course, schedule)
s = Student('118010154','lyh','SDS','CSE', 3, 90, ['CSC4001'])

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
    get_course('CSC1001')
