from schedule import Schedule
from student import Student,Preference
import course
from course import Course, Instructor, Session
import DB.dbModels as dbMdl
from DB.dbModels import db

ALPHABETS = 'abcdefghijklmnopqrstuvwxyz'
DIGITS = '0123456789'

# Global variables
courses = dict()
instructors = dict()

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


db.session.add(dbMdl.Course(code='CSC4001', name='Software Engineering', school='SDS',
                            units=3, prereqs='CSC1001 CSC3002'))

db.session.add(dbMdl.Course(code='CSC1001', name='Python', school='SDS',
                            units=3, prereqs=''))
db.session.add(dbMdl.Course(code='CSC1002', name='Python Lab', school='SDS',
                            units=3, prereqs=''))
db.session.add(dbMdl.Course(code='CSC3001', name='Discrete Math', school='SDS',
                            units=3, prereqs=''))
db.session.add(dbMdl.Course(code='CSC3100', name='Data Structure', school='SDS',
                            units=3, prereqs='CSC1001'))
db.session.add(dbMdl.Course(code='CSC3170', name='Database System', school='SDS',
                            units=3, prereqs='CSC1001 MAT1001'))
db.session.add(dbMdl.Course(code='CSC3002', name='CXX', school='SDS',
                            units=3, prereqs='CSC1001'))
db.session.add(dbMdl.Course(code='CSC3050', name='Computer Architecture', school='SDS',
                            units=3, prereqs='CSC1001 CSC3002'))
db.session.add(dbMdl.Course(code='CSC4160', name='Cloud Computing', school='SDS',
                            units=3, prereqs='CSC1001'))

db.session.add(dbMdl.Instructor('Han Xiaoguang', school='SSE', isLecturer=True, website='...'))
db.session.add(dbMdl.Instructor('lyx', school='SDS', isLecturer=False, website='...'))
db.session.add(dbMdl.Instructor('lzy', school='SDS', isLecturer=False, website='...'))
db.session.add(dbMdl.Instructor('ca', school='SDS', isLecturer=False, website='...'))

db.session.add(dbMdl.Instructor('lecturer1', school='school', isLecturer=True, website='abc'))
db.session.add(dbMdl.Instructor('tutor1', school='school', isLecturer=False, website='def'))
db.session.add(dbMdl.Instructor('tutor2', school='school', isLecturer=False, website='ghi'))




db.session.add(
    dbMdl.Session(course_code='CSC4001',
                  type='lec', instr='1', venue='TA101',
                  class1='1 08:30-1 09:50',
                  class2='3 08:30-3 09:50')
               )
db.session.add(
    dbMdl.Session(course_code='CSC4001',
                  type='tut', instr='2 3', venue='TA101',
                  class1='2 19:30-2 20:30')
               )











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
    if not c:
        print("not found")
        return None
    # create Course instance
    prereqs = {p for p in c.prereqs.split(' ')}
    comment = None  # TODO: Fetch and create Comment instance
    course = Course(dept, code, c.name, c.units, prereqs, comment)
    courses[full_code] = course

    for s in ss:
        ins_id = [int(i) for i in s.instr.split(' ')]
        ss_ins = set()
        for id in ins_id:
            if id in instructors:
                ss_ins.add(instructors[i])
            else:
                # Fetch info from db
                ins = dbMdl.Instructor.query.filter_by(id=id).first()
                # create Instructor instance
                # TODO: add website
                instr = Instructor(ins.name, ins.school, ins.isLecturer)
                instructors[id] = instr
                ss_ins.add(instr)

        class1 = tuple(t for t in s.class1.split('-'))
        class2 = tuple(t for t in s.class1.split('-')) if s.class2 else None
        course.add_session(s.sno, ss_ins, s.venue, s.type, class1, class2)

    return course
    # print()
    # print(s.course)

def get_student(stuid: str) -> Student:
    s = dbMdl.Student.query.filter_by(id=stuid).first()
    courses = s.studied_courses.split(' ')
    pref = Preference(course_wishlist=None, no_morning=False, no_noon=False, no_friday=False)
    return Student(s.id, s.name, s.school, s.major, s.year, s.tot_credit, courses, pref)

def create_new_student(stuid, name, pwd, school, major, year, tot_credit, courses):
    s = dbMdl.Student(stuid, name, pwd, school, major, year, tot_credit, studied_courses=courses)
    db.session.add(s)
    pref = Preference(course_wishlist=None, no_morning=False, no_noon=False, no_friday=False)
    return Student(s.id, s.name, s.school, s.major, s.year, s.tot_credit, courses, pref)


'''
1.LOGIN
'''

# login ==> stuid & pwd

# stuid -> db -> pwd == pwd

# Initialization of Schedule and Student instance

# schedule = Schedule()

# s = Student(stuid, name, school, major, year, tot_credit, studied_course, schedule)
s = Student('118010154', 'lyh', 'SDS', 'CSE', 3, 90, ['CSC4001'])

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
    get_course('CSC4001')
    print(', '.join(str(c) for c in courses))
    print(', '.join(str(i) for i in instructors))
