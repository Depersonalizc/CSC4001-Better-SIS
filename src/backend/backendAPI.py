# from hashlib import new
from flask.globals import session
from sqlalchemy.orm import query
import DB.dbModels as dbMdl
from DB.dbModels import db
from DB.dbModels import app
# import hashlib
import json
import random
from flask import make_response, request
from get_instance import get_course, get_schedule, get_student
from flask_cors import cross_origin, CORS
from calendar import day_name
from get_instance import get_course, get_student, get_schedule
CORS(app, supports_credentials=True, resources=r"/*")

# cookies_stuid = request.cookies.get('studentID')
# if cookies_stuid:
#     get_student(cookies_stuid)

def check_studied(course, stu):
    return course.full_code in stu.studied_courses


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
    if stu: # found student in db
        resp = make_response('success')
        resp.set_cookie('studentID', '118010154')
        get_student(stuid)
        get_schedule(stuid)
        rtdata["exist"] = True
        if stu.check_password(pwd): # check password
            print("corrent pwd")
            rtdata["correctPwd"] = True
            get_student(stuid)
            return json.dumps(rtdata)
        else:
            print("wrong pwd")
            return json.dumps(rtdata)
    else:
        print("No such student")
        return json.dumps(rtdata)

### 1.5 search stu
@app.route('/searchStu/<string:stuid>', methods=['GET'])
def find_stu(stuid: str):
# @app.route('/searchStu', methods=['GET'])
# def find_stu():
#     stuid = request.cookies.get('studentID')
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

### 3 get student info
@app.route('/getStudentInfo/<string:stuid>', methods=['GET'])
def getStuInfo(stuid:str):
    # stuid = request.cookies.get('studentID')
    stu = dbMdl.Student.query.filter_by(id=stuid).first()
    wkSchdlData = {'confirmed': None, 'added': None}
    if stu:
        schdlInst = get_schedule(stuid) # get schedule of the student
        sesData = [[], []]
        for i, pkgs in enumerate(
            [schdlInst.selected_pkgs, schdlInst.buffer_pkgs]
        ):
            for pkg in pkgs: 
                snos = []
                if pkg.lec_sess is not None:
                    snos.append(pkg.lec_sess.session_no)
                if pkg.tut_sess is not None:
                    snos.append(pkg.tut_sess.session_no)
                # if any selected/buffer_pkgs, query course, session, instructor data and return to front end
                for sno in snos:
                    ses = dbMdl.Session.query.filter_by(sno=sno).first()
                    instr = dbMdl.Instructor.query.filter_by(
                        id=int(ses.instr.split(' ')[0])).first()
                    timesltData = []
                    if ses.class1: # check classes in the session
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
                    sesData[i].append({"sessionNumber": ses.sno,
                                        "courseCode": ses.course,
                                        "isLecture": ses.type == 'lec',
                                        "instructor": instr.name,
                                        'timeSlots': timesltData,
                                        "location": ses.venue,
                                        "currentEnrollment": ses.curEnroll,
                                        "classCapacity": ses.capacity,
                                        })
        wkSchdlData['confirmed'] = sesData[0]
        wkSchdlData['added'] = sesData[1]
        return json.dumps({
            "name":       stu.name,
            "studentID":  stu.id,
            "year":       stu.year,
            "gender":     stu.gender,
            "school":     stu.school,
            "college":    stu.college,
            "major":      stu.major,
            "tot_creidt": stu.tot_credit,
            'weeklySchedule': wkSchdlData
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
            "tot_creidt": None,
            'weeklySchedule': None
        })

### 4 get term info, we temporary consider only one semester
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
    code = request.form['courseCode']      #1001
    school = request.form['school']        #SSE
    # stuid = request.cookies.get('studentID')
    target = request.form['targetStudent']
    stuid = request.form['studentID']      #118
    stuInst = get_student(stuid)

    courses = dbMdl.Course.query # query by the criteria
    if code:
        courses = courses.filter_by(suffix=code)
    if pre:
        courses = courses.filter_by(prefix=pre)
    if school:
        courses = courses.filter_by(school=school)
    courses = courses.all()

    coursesData = []
    for crs in courses:
        mrkCrtrData = []
        prereqsData = crs.prereqs.split(' ')
        prereqsStfyData = []

        if prereqsData == ['']: # check prerequisite status and return
            prereqsData = ["No prerequisite course"]
            prereqsStfyData = [True]
        else:
            for prrq in prereqsData:
                prereqsStfyData.append(prrq in stuInst.studied_courses)

        for mrkCrtrItm in crs.markingCriteria.split(","):
            mrkCrtrData.append({"item": mrkCrtrItm.split(':')[0],
                                "weight": mrkCrtrItm.split(':')[1]})
        sessionData = []
        sessions = dbMdl.Session.query.filter_by(course=crs.code).all()
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
                                "courseCode": crs.code,
                                "isLecture": ses.type=='lec',
                                "instructor": instr.name,
                                'timeSlots': timesltData,
                                "location": ses.venue,
                                "currentEnrollment": ses.curEnroll,
                                "classCapacity": 120,#ses.capacity,
                                })
        
        coursesData.append({
            'title':          crs.code,       # full code
            'fullname':       crs.code+' - '+crs.name,
            'code':           code,
            'credit':         crs.units,
            'school':         crs.school,
            'term':           "2020-2021 Term 2",
            "mode":           "onsite",
            "targetStudent":  "Undergraduate",
            'introduction':   crs.intro,
            'markingCriteria': mrkCrtrData,
            "syllabus":     crs.syllabus,
            "prerequisite": prereqsData,
            'prereqSatisfied': prereqsStfyData,
            "session":      sessionData,
        })
    return json.dumps(coursesData)

### 6 create course instance
@app.route('/coursePage/<string:courseCode>', methods=['GET'])
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

### 7 add class to confirmed list (manual)
@app.route('/addClass', methods=['POST'])
def addClass():
    data = json.loads(request.get_data(as_text=True))
    snos = data['sessionNo']
    stuid = data['studentID']
    error = ''
    print(snos)
    # try:
    sche = get_schedule(stuid)
    sche.init_buffer()
    sess = dbMdl.Session.query.filter_by(sno=snos[0]).first()
    c = get_course(sess.course)

    for pkg in sche.selected_pkgs:
        if check_studied(c, get_student(stuid)):
            error = 'You have studied this course!'
            print(error)
            return json.dumps({'added' : False, 'error': error})
        if pkg.lec_sess is not None:
            if pkg.lec_sess.session_no == int(snos[0]):
                error = 'Has selected a lecture for this course'
                print(error, ' ',int(snos[0]))
                return json.dumps({'added' : False, 'error': error})
        if pkg.tut_sess is not None:
            if pkg.tut_sess.session_no == int(snos[1]):
                error = 'Has selected a tutorial for this course'
                print(error, ' ', int(snos[1]))                
                return json.dumps({'added' : False, 'error': error})

    if not sche.buffer_session_by_sno(c,int(snos[0]),int(snos[1])):
        error = 'Failed to add class, error: wrong session number'
        print(error)
        return json.dumps({'added' : False, 'error': error})
    sche.select_buffer_pkgs()
    # db.session.add()
    print(sche)
    return json.dumps({'added' : True, 'error': error})
    # except Exception as e:
    #     print('Failed to add class, error: ', e)
    #     error = 'exception'
    #     return json.dumps({'added' : False, 'error': error})

### 7.2 remove one course (pkg) in confirmed list
@app.route('/removeOneCourse', methods=['POST'])
def removeOneCourse():
    code = request.form['courseCode']
    stuid = request.form['studentID']
    # stuid = request.cookies.get('studentID')
    try:
        sche = get_schedule(stuid)
        sche.remove_selected_pkg(code)
        return json.dumps({'removed' : True})
    except:
        return json.dumps({'removed' : False})

### 7.3 remove all confirmed list
@app.route('/removeAllCourse/<string:stuid>', methods=['GET'])
def removeAllCourse(stuid: str):
    # code = request.form['courseCode']
    # stuid = request.cookies.get('studentID')
    # stuid = request.form['studentID']
    try:
        sche = get_schedule(stuid)
        sche.empty_selected()
        return json.dumps({'removed' : True})
    except:
        return json.dumps({'removed' : False})

### 8. test if session is conflict, used to button, use can buffer session
@app.route('/canBufferSession', methods=['POST'])
def canBufferSession():
    data = json.loads(request.get_data(as_text=True))
    snos = data['sessionNo']
    stuid = data['studentID']
    # stuid = request.cookies.get('studentID')

    ret = dict()
    # error = ''
    # try:
    sche = get_schedule(stuid)
    for sno in snos:
        selected = False
        s = dbMdl.Session.query.filter_by(sno=sno).first()
        print('here')
        course = get_course(s.course)
        sess = course.find_session_instance(s.type, s.sno)

        for pkg in sche.selected_pkgs:                          # if this course is selected, then cannot buffer
            if pkg.course.full_code == course.full_code:
                ret[sno] = False
                selected = True
        if check_studied(pkg.course, get_student(stuid)):
            ret[sno] = False
        print('enroll: ',sess.cur_enroll,'capacity: ', sess.capacity)
        if not selected:
            ret[sno] = sche.can_buffer_session(sess)
    return json.dumps({'able' : ret})
    # except Exception as e:
    #     print(e)
    #     return json.dumps({'able' : None})


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

### 11. Set Preference
@app.route('/setPreference', methods=['POST'])
def setPreference():
    noMorning = request.form['noMorning']
    noNoon = request.form['noNoon']
    noFriday = request.form['noFriday']
    # stuid = request.cookies.get('studentID')
    stuid = request.form['studentID']
    try:
        student = get_student(stuid)
        student.preference.no_morning = noMorning
        student.preference.no_noon = noNoon
        student.preference.no_friday = noFriday
        print(student.preference)
        return json.dumps({'seted': True})
    except:
        return json.dumps({'seted': False})

#### 12. One click auto schedule, return a schedule
@app.route('/autoSchedule/<string:stuid>', methods=['GET'])
def autoSchedule(stuid: str):
    # stuid = request.form['studentID']
    sche = get_schedule(stuid)
    sche.auto_schedule()
    print(sche)
    wkSchdlData = {'confirmed': None, 'added': None}
    sesData = [[], []]
    
    for i, pkgs in enumerate(
                [sche.selected_pkgs, sche.buffer_pkgs]
            ):
        for pkg in pkgs:
            # print(pkg)
            for sno in [pkg.lec_sess.session_no, pkg.tut_sess.session_no]:
                ses = dbMdl.Session.query.filter_by(sno=sno).first()
                instr = dbMdl.Instructor.query.filter_by(
                    id=int(ses.instr.split(' ')[0])).first()
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
                sesData[i].append({"sessionNumber": ses.sno,
                                    "courseCode": ses.course,
                                    "isLecture": ses.type == 'lec',
                                    "instructor": instr.name,
                                    'timeSlots': timesltData,
                                    "location": ses.venue,
                                    "currentEnrollment": ses.curEnroll,
                                    "classCapacity": ses.capacity,
                                    })
    wkSchdlData['confirmed'] = sesData[0]
    wkSchdlData['added'] = sesData[1]

    return json.dumps({'schedule':wkSchdlData})

#### 13. can add wishlist
@app.route('/canWishlistCourse', methods=['POST'])
def canWishlistCourse():
    full_code = request.form['courseCode']
    stuid = request.form['studentID']

    try:
        sche = get_schedule(stuid)
        course = get_course(full_code)
        ret = sche.can_wishlist_course(course)
        if check_studied(course, get_student(stuid)):
            ret = False
        return json.dumps({'able' : ret})
    except:
        return json.dumps({'able' : None})


### 14. auto schedule confirm
@app.route('/autoScheduleConfirm/<string:stuid>', methods=['GET'])
def autoScheduleConfirm(stuid: str):
    # stuid = request.form['studentID']

    try:
        sche = get_schedule(stuid)
        sche.select_buffer_pkgs()
        print(sche)
        return json.dumps({'confirmed' : True})
    except:
        return json.dumps({'confirmed' : False})

#### 15. add wishlist
@app.route('/addWishlist', methods=['POST'])
def addWishlist():
    data = json.loads(request.get_data(as_text=True))
    courses = data['courseCodes']
    stuid = data['studentID']
    stu = get_student(stuid)
    sche = get_schedule(stuid)

    added = [False] * len(courses)
    error = [''] * len(courses)
    print(sche.preference)
    for idx, c in enumerate(courses):
        cour = get_course(c)
        if check_studied(cour, stu):
            added[idx] = False
            error[idx] = 'has_taken'
            continue
        elif not sche.add_course_to_wishlist(cour):
            added[idx] = False
            if cour in sche.preference.course_wishlist:
                error[idx] = 'Already in wishlist'
            else:
                error[idx] = 'Prerequisite not satisfied'
        else:
            added[idx] = True
        print(sche.preference)
    print(stu.preference)
    return json.dumps({'added' : added, "error": error})




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

