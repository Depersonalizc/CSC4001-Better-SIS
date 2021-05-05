# from hashlib import new
from flask.globals import session
import DB.dbModels as dbMdl
from DB.dbModels import db
from DB.dbModels import app
# import hashlib
import json
from flask import request
from flask_cors import cross_origin, CORS
from calendar import day_name
CORS(app, supports_credentials=True, resources=r"/*")

@app.route('/searchStu/<string:stuid>', methods=['GET'])
# @cross_origin()
def find_stu(stuid: str):
    stu = dbMdl.Student.query.filter_by(id=stuid).first()
    if stu:
        print("stu exist")
        return json.dumps({"exist": True})
    else:
        return json.dumps({"exist": False})


@app.route('/signup', methods=['POST'])
# @cross_origin()
def crate_stu():
    stuid = request.form['studentID']
    name = request.form['userName']
    pwd = request.form['password']
    school = request.form['school']
    collage = request.form['collage']
    major = request.form['major']
    year = request.form['year']
    # permission = request.form['permission']
    rtdata = {
        "crated": True,
        "error": None,
        "studentID": stuid
    }

    stu = dbMdl.Student.query.filter_by(id=stuid).first()
    if stu:
        # db.session.delete(stu)
        print("stu exist")
        rtdata["crated"] = False
        rtdata["error"] = "Account Already Exists"
        return json.dumps(rtdata)
    newStu = dbMdl.Student(stuid,
                            name,
                            pwd,
                            school,
                            major,
                            year,
                            collage=collage)
                            # permission = permission)
    db.session.add(newStu)
    db.session.commit()
    print("add stu done")
    return json.dumps(rtdata)


@app.route('/signin', methods=['POST'])
# @cross_origin()
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


@app.route('/getStudentInfo/<string:stuid>', methods=['GET'])
# @cross_origin()
def getStuInfo(stuid:str):
    stu = dbMdl.Student.query.filter_by(id=stuid).first()
    if stu:
        return json.dumps({
            "name":       stu.name,
            "studentID":  stu.id,
            "year":       stu.year,
            "gender":     None,
            "school":     stu.school,
            "college":    None,
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


def delete_stu(stuid:str):
    stu = dbMdl.Student.query.filter_by(id = stuid).first()
    if stu:
        db.session.delete(stu)
        db.session.commit()
        print("del stu done")
        return json.dumps({
            "del": False,
            "error": "Account didn't Exist"
        })
    else:
        print("No such student")
        return json.dumps({
            "del": True,
            "error": None
        })
    
def verify_pwd():
    stuid = request.form['stuid']
    pwd = request.form['pwd']
    stu = dbMdl.Student.query.filter_by(id = stuid).first()
    # return stu.check_password(pwd)
    if stu.check_password(pwd):
        print("corrent pwd")
        return json.dumps({
            "correctPwd": True
        })
    else:
        print("wrong pwd")
        return json.dumps({
            "correctPwd": False
        })

def change_pwd(stuid: int, newpwd):
    stu = dbMdl.Student.query.filter_by(id = stuid).first()
    if stu.check_password(newpwd):
        print("same as before")
    else:
        stu.password = newpwd
        print("change pwd done")
    db.session.commit()


@app.route('/getTermInfo', methods=['GET'])
# @cross_origin()
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

@app.route('/searchCourse', methods=['POST'])
# @cross_origin()
def searchCourse():
    pre = request.form['coursePrefix']     #CSC
    code = str(request.form['courseCode']) #1001
    school = request.form['school']        #SSE
    ret = dbMdl.Course.query.filter_by(code=pre+code).first()
    mrkCrtrData = [
        # {
        #     "item":   "Assignments",
        #     "weight": "20%",
        # },
        # {
        #     "item":   "Midterm Exam",
        #     "weight": "30%",
        # },
        # {
        #     "item":   "Final Exam",
        #     "weight": "50%",
        # },
    ]
    for mrkCrtrItm in ret.markingCriteria.split(","):
        mrkCrtrData.append({"item": mrkCrtrItm.split(':')[0],
                            "weight": mrkCrtrItm.split(':')[1]})
    sessionData = []
    sessions = dbMdl.Session.query.filter_by(course=pre+code).all()
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
                            "isLecture": ses.type=='lec',
                            "instructor": instr.name,
                            'timeSlots': timesltData,
                            "location": ses.venue,
                            "currentEnrollment": ses.curEnroll,
                            "classCapacity": ses.capacity,
                            })

    return json.dumps({
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


def crate_course(course_code,
                 name=None,
                 school=None,
                 units=None,
                 prereqs=None,
                 lecturers=None,
                 tutors=None):
    course = dbMdl.Course.query.filter_by(code=course_code).first()
    if course:
        print("course exist")
        return
    newCourse = dbMdl.Course(course_code,
                             name,
                             school,
                             units,
                             prereqs,
                             lecturers,
                             tutors)
    db.session.add(newCourse)
    db.session.commit()
    print("add stu done")

def search_course(course_code):
    course = dbMdl.Course.query.filter_by(code=course_code).first()
    if course:
        print("course exist")
    else:
        print("course doesn't exist")


def search_all_session(course_code):
    sessions = dbMdl.Session.query.filter_by(course=course_code).all()
    for sec in sessions:
        print(sec.sno,sec.course, sec.type)


def crate_session(course_code: str,
                  type: str,
                  instr: str = None,
                  venue: str = None,
                  class1: str = None,
                  class2: str = None):
    newSes = dbMdl.Session(course_code,
                           type,
                           instr=instr,
                           venue=venue,
                           class1=class1,
                           class2=class2)
    db.session.add(newSes)
    db.session.commit()
    print("crate sec")


if __name__ == "__main__":
    app.run(host='0.0.0.0')
    db.init_app(app)
