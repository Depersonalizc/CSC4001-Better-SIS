# from hashlib import new
from flask.globals import session
import DB.dbModels as dbMdl
from DB.dbModels import db
from DB.dbModels import app
# import hashlib
import json
import random
from flask import request
from backend.get_instance import get_course, get_schedule, current_student
from flask_cors import cross_origin, CORS
from calendar import day_name
from get_instance import get_course, get_student, create_new_student, get_schedule
CORS(app, supports_credentials=True, resources=r"/*")

### 1.5 search stu
@app.route('/searchStu/<string:stuid>', methods=['GET'])
def find_stu(stuid: str):
# @app.route('/searchStu', methods=['GET'])
# def find_stu():
    # stuid = request.cookies.get('studentID')
    stu = dbMdl.Student.query.filter_by(id=stuid).first()
    if stu:
        print("stu exist")
        return json.dumps({"exist": True})
    else:
        return json.dumps({"exist": False})

### 2 signup
@app.route('/signup', methods=['POST'])
def create_stu():
    stuid = request.form['studentID']
    name = request.form['userName']
    pwd = request.form['password']
    school = request.form['school']
    college = request.form['college']
    major = request.form['major']
    year = request.form['year']
    # permission = request.form['permission']
    rtdata = {
        "created": True,
        "error": None,
        "studentID": stuid
    }

    stu = dbMdl.Student.query.filter_by(id=stuid).first()
    if stu:
        # db.session.delete(stu)
        print("stu exist")
        rtdata["created"] = False
        rtdata["error"] = "Account Already Exists"
        return json.dumps(rtdata)
    newStu = dbMdl.Student(stuid,
                            name,
                            pwd,
                            school,
                            major,
                            year,
                            college=college)
                            # permission = permission)
    db.session.add(newStu)
    db.session.commit()
    print("add stu done")
    return json.dumps(rtdata)

### 1 signin
@app.route('/signin', methods=['POST'])
def signin_stu():
    # stu = dbMdl.Student.query.filter(
    #     dbMdl.Student.id == stuid).first()
    stuid = request.form['studentID']
    pwd = request.form['password']
    stu = dbMdl.Student.query.filter_by(id = stuid).first()
    rtdata = {
        "exist": False,
        "correctPwd": False
    }
    if stu:
        stuInst = get_student(stuid)
        schdlInst = get_schedule(stuid)
        rtdata["exist"] = True
        if stu.check_password(pwd):
            print("corrent pwd")
            rtdata["correctPwd"] = True
            return json.dumps(rtdata)
        else:
            print("wrong pwd")
            return json.dumps(rtdata)
    else:
        print("No such student")
        return json.dumps(rtdata)

### 3 get student info
@app.route('/getStudentInfo/<string:stuid>', methods=['GET'])
def getStuInfo(stuid:str):
# @app.route('/getStudentInfo', methods=['GET'])
# def getStuInfo():
    # stuid = request.cookies.get('studentID')
    stu = dbMdl.Student.query.filter_by(id=stuid).first()
    if stu:
        return json.dumps({
            "name":       stu.name,
            "studentID":  stu.id,
            "year":       stu.year,
            "gender":     stu.gender,
            "school":     stu.school,
            "college":    stu.college,
            "major":      stu.major,
            "tot_creidt": stu.tot_credit
        })
    else:
        return json.dumps({
            "name":       None,
            "studentID":  None,
            "year":       None,
            "gender":     None,
            "school":     None,
            "college":    None,
            "major":      None,
            "tot_creidt": None
        })

    # TODO

### 4 get term info
@app.route('/getTermInfo', methods=['GET'])
def getTermInfo():
    return json.dumps([
        "2018-2019 Term 1",
        "2018-2019 Term 2",
        "2018-2019 Summer Term",
        "2019-2020 Term 1",
        "2019-2020 Term 2",
        "2019-2020 Summer Term",
        "2020-2021 Term 1",
        "2020-2021 Term 2",
        "2020-2021 Summer Term",
    ])

### 5 search course
@app.route('/searchCourse', methods=['POST'])
def searchCourse():
    pre = request.form['coursePrefix']     #CSC
    code = request.form['courseCode'] #1001
    school = request.form['school']        #SSE
    if not pre:
        rets = dbMdl.Course.query.filter_by(suffix=code).all()
    elif not code:
        rets = dbMdl.Course.query.filter_by(prefix=pre).all()
    else:
        rets = dbMdl.Course.query.filter_by(code=pre+str(code)).all()

    coursesData = []
    for ret in rets:
    
        mrkCrtrData = []
        for mrkCrtrItm in ret.markingCriteria.split(","):
            mrkCrtrData.append({"item": mrkCrtrItm.split(':')[0],
                                "weight": mrkCrtrItm.split(':')[1]})
        sessionData = []
        sessions = dbMdl.Session.query.filter_by(course=pre+str(code)).all()
        for ses in sessions:
            instr = dbMdl.Instructor.query.filter_by(id=int(ses.instr.split(' ')[0])).first()
            timesltData = []
            if ses.class1:
                timesltData.append({
                    "weekday": day_name[int(ses.class1[0])-1],
                    "beginTime": ses.class1[2:7],
                    "endTime": ses.class1[10:],
                })
            if ses.class2:
                timesltData.append({
                    "weekday": day_name[int(ses.class2[0])-1],
                    "beginTime": ses.class2[2:7],
                    "endTime": ses.class2[10:],
                })
            sessionData.append({"sessionNumber": ses.sno,
                                "courseCode": ret.code,
                                "isLecture": ses.type=='lec',
                                "instructor": instr.name,
                                'timeSlots': timesltData,
                                "location": ses.venue,
                                "currentEnrollment": ses.curEnroll,
                                "classCapacity": ses.capacity,
                                })
            coursesData.append({
                'title':          ret.code,       # full code
                'fullname':       ret.code+' - '+ret.name,
                'code':           code,
                'credit':         ret.units,
                'school':         ret.school,
                'term':           "2020-2021 Term 2",
                "mode":           "onsite",
                "targetStudent":  "Undergraduate",
                'introduction':   ret.intro,
                'markingCriteria': mrkCrtrData,
                "syllabus":     ret.syllabus,
                "prerequisite": ret.prereqs.split(' '),
                "session":      sessionData,
            })
    return json.dumps(coursesData)

### 6 create course instance
@app.route('/coursePage/<string:courseCode>', method=['GET'])
def create_course_instance(courseCode: str):
    if dbMdl.Course.query.filter_by(code=courseCode).first():
        try:
            get_course(courseCode)
            return json.dumps({'create': True})
        except:
            print('Failed creating course instance')
    return json.dumps({'create': False})

### 6.1 get instructor info
@app.route('/getInstr/<string:courseCode>', methods=['GET'])
def getInstr(courseCode: str):
    InstrData = []
    lecs = dbMdl.Session.query.filter(dbMdl.Session.course==courseCode, dbMdl.Session.type=='lec').all()
    for lec in lecs:
        instr = dbMdl.Instructor.query.filter_by(id=int(lec.instr.split(' ')[0])).first()
        InstrData.append({
            'name':      instr.name,
            'school':    instr.school,
            'website':   instr.website,
            'profile':   instr.profile,
            'email':     instr.email,
        })
    return json.dumps(InstrData)

### 10.1 get course comment
@app.route('/getCourseComment/<string:courseCode>', methods=['GET'])
def getCourseComment(courseCode: str):
    cmtData = []
    avgRating = 0.0
    cmts = dbMdl.Comment.query.filter_by(course=courseCode).all()
    for cmt in cmts:
        avgRating += cmt.rating
        cmtData.append({
            'commentID':  cmt.id,
            'author':     cmt.stuName,
            'datetime':   cmt.time,
            'rating':     cmt.rating,
            'content':    cmt.content,
        })
    avgRating = round(avgRating/len(cmts),1)
    return json.dumps({
        'avgRating':    avgRating,
        'comments':     cmtData
    })


### 10.2 post course comment
@app.route('/postCourseComment', methods=['POST'])
def postCourseComment():
    corsCode = request.form['courseCode']
    stuid = request.form['studentID']
    auther = request.form['author']
    rating = request.form['rating']
    content = request.form['content']
    try:
        db.session.add(dbMdl.Comment(stuid, auther, corsCode, rating, content))
        db.session.commit()
        return json.dumps({'succeed':True})
    except:
        return json.dumps({'succeed':False})



# def delete_stu(stuid:str):
#     stu = dbMdl.Student.query.filter_by(id = stuid).first()
#     if stu:
#         db.session.delete(stu)
#         db.session.commit()
#         print("del stu done")
#         return json.dumps({
#             "del": False,
#             "error": "Account didn't Exist"
#         })
#     else:
#         print("No such student")
#         return json.dumps({
#             "del": True,
#             "error": None
#         })
    
# def verify_pwd():
#     stuid = request.form['stuid']
#     pwd = request.form['pwd']
#     stu = dbMdl.Student.query.filter_by(id = stuid).first()
#     # return stu.check_password(pwd)
#     if stu.check_password(pwd):
#         print("corrent pwd")
#         return json.dumps({
#             "correctPwd": True
#         })
#     else:
#         print("wrong pwd")
#         return json.dumps({
#             "correctPwd": False
#         })

# def change_pwd(stuid: int, newpwd):
#     stu = dbMdl.Student.query.filter_by(id = stuid).first()
#     if stu.check_password(newpwd):
#         print("same as before")
#     else:
#         stu.password = newpwd
#         print("change pwd done")
#     db.session.commit()


# def create_course(course_code,
#                  name=None,
#                  school=None,
#                  units=None,
#                  prereqs=None,
#                  lecturers=None,
#                  tutors=None):
#     course = dbMdl.Course.query.filter_by(code=course_code).first()
#     if course:
#         print("course exist")
#         return
#     newCourse = dbMdl.Course(course_code,
#                              name,
#                              school,
#                              units,
#                              prereqs,
#                              lecturers,
#                              tutors)
#     db.session.add(newCourse)
#     db.session.commit()
#     print("add stu done")

# def search_course(course_code):
#     course = dbMdl.Course.query.filter_by(code=course_code).first()
#     if course:
#         print("course exist")
#     else:
#         print("course doesn't exist")


# def search_all_session(course_code):
#     sessions = dbMdl.Session.query.filter_by(course=course_code).all()
#     for sec in sessions:
#         print(sec.sno,sec.course, sec.type)


# def create_session(course_code: str,
#                   type: str,
#                   instr: str = None,
#                   venue: str = None,
#                   class1: str = None,
#                   class2: str = None):
#     newSes = dbMdl.Session(course_code,
#                            type,
#                            instr=instr,
#                            venue=venue,
#                            class1=class1,
#                            class2=class2)
#     db.session.add(newSes)
#     db.session.commit()
#     print("create sec")


if __name__ == "__main__":
    app.run(host='0.0.0.0')
    # app.run()
    db.init_app(app)
