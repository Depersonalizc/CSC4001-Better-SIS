from hashlib import new
import dbModels as dbMdl
from dbModels import db
from dbModels import app
import hashlib
import json
from flask import request


userPrefix = "/user/"


@app.route(userPrefix+'signup', methods=['POST'])
# def crate_stu(stuid:int,
#               name: str,
#               pwd: str,
#               school: str = None,
#               major: str = None,
#               year: int = None,
#               totcrdt: int = None,
#               studied_courses: str = None,
#               pref: str = None,
#               wishlist: str = None,
#               schedule: str = None,
#               permission: int = None):
def crate_stu():
    stuid = request.form['stuid']
    name = request.form['name']
    pwd = request.form['pwd']
    school = request.form['school']
    major = request.form['major']
    year = request.form['year']
    permission = request.form['permission']
    rtdata = {
        "crated": True,
        "error": None
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
                            permission = permission)
    db.session.add(newStu)
    db.session.commit()
    print("add stu done")
    return json.dumps(rtdata)


@app.route(userPrefix+'signin', methods=['POST'])
def signin_stu():
    # stu = dbMdl.Student.query.filter(
    #     dbMdl.Student.id == stuid).first()
    stuid = request.form['stuid']
    pwd = request.form['pwd']
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


@app.route(userPrefix+'delstu/<int:stuid>')
def delete_stu(stuid:int):
    stu = dbMdl.Student.query.filter_by(id = stuid).first()
    if stu:
        db.session.delete(stu)
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
    db.session.commit()


# @app.route(userPrefix+'verifypwd', methods=['POST'])
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


def change_pwd(stuid: int, newpwd):
    stu = dbMdl.Student.query.filter_by(id = stuid).first()
    if stu.check_password(newpwd):
        print("same as before")
    else:
        stu.password = newpwd
        print("change pwd done")
    db.session.commit()


def crate_course(course_code,
                 name=None,
                 school=None,
                 units=None,
                 prereqs=None,
                 lecturers=None,
                 tutors = None):
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
    newSes = dbMdl.Session(course=course_code,
                           type=type,
                           instr=instr,
                           venue=venue,
                           class1=class1,
                           class2=class2)
    # newSes = dbMdl.Session(course_code,
    #                        type,
    #                        instr,
    #                        venue,
    #                        class1,
    #                        class2)
    db.session.add(newSes)
    db.session.commit()
    print("crate sec")


# if __name__ == "__main__":
#     app.run()
#     db.init_app(app)
