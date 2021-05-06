from DB.dbModels import db
import DB.dbModels as dbMdl
from schedule import Schedule
from course import Course, Instructor, Session
from student import Student, Preference
from schedule import Schedule

# Global variables
courses = dict()      #temp rule: course full code : course instance
instructors = dict()  #temp rule: instr id : instr instance  # necessary?
students = dict()     #temp rule: stu id : stu instance      # necessary? schdl contains a stu instance
schedules = dict()    #temp rule: stu id : schdl instance


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
                ss_ins.add(instructors[i-1])            # idx in db begins from 1, but list starts from 0
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
        course.add_session(session_no=s.sno,
                           instructors=ss_ins,
                           venue=s.venue,
                           session_type=s.type,
                           class1=class1,
                           class2=class2,
                           capacity=s.capacity,
                           cur_enroll=s.curEnroll)

    return course
    # print()
    # print(s.course)


def get_student(stuid: str) -> Student:
    if stuid in students:
        return students[stuid]
    s = dbMdl.Student.query.filter_by(id=stuid).first()
    studied_courses = set(s.studied_courses.split(' '))
    pref = Preference()
    stud = Student(s.id, s.name, s.school, s.major, s.year,
                   s.tot_credit, studied_courses, pref)
    students[stuid] = stud
    return stud


# not being used currently
def create_new_student(stuid, name, pwd, school, major, year, tot_credit, studied_courses):
    c = ' '.join(x for x in studied_courses)
    s = dbMdl.Student(stuid, name, pwd, school, major, year, tot_credit, studied_courses=c)
    try:
        db.session.add(s)
        db.commit()
    except:
        print('Failed to add student!')
        return -1
    else:
        pref = Preference()
        stud = Student(s.id, s.name, s.school, s.major, s.year,
                       s.tot_credit, studied_courses, pref)
        students[stuid] = stud
        return students


def get_schedule(stuid):
    assert stuid in students, 'No such student in {students}, try sign in first'
    stud = students[stuid]
    if stuid in schedules:
        return schedules[stuid]
    sche = Schedule(stud)
    schedules[stuid] = sche
    return sche
