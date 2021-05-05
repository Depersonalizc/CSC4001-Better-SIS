# import sqlite3
import hashlib
# from random import randint, choice
import random
from datetime import datetime, time
from flask import Flask
from flask.helpers import send_file
# from flask.globals import session
from flask_sqlalchemy import SQLAlchemy


SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False

# app = Flask(__name__, template_folder='../front-end',
            # static_folder='../front-end', static_path='')
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS

db = SQLAlchemy(app)
# db.init_app(app)

class Student(db.Model):
    __tablename__ = 'Student'
    id = db.Column(db.String(10), primary_key=True)  # autoincrement=True
    name = db.Column(db.String(20), nullable=False)
    __password = db.Column(db.String(200), nullable=False)
    permission = db.Column(db.Integer, default=1) #0 adm, 1 normal stu
    collage = db.Column(db.String(20)) #db.Enum("Consumer", "Designer", "Company"), default=
    school = db.Column(db.String(10))
    major = db.Column(db.String(10))
    year = db.Column(db.Integer)
    tot_credit = db.Column(db.Integer)
    studied_courses = db.Column(db.Text)
    # preference = db.Column(db.String(50))
    # wishlist = db.Column(db.Text)
    # schedule = db.Column(db.Text)

    # UserImage = db.Column(db.BLOB)

    def __init__(self, 
                id:str, 
                name:str, 
                pwd:str, 
                school:str=None, 
                major:str=None, 
                year:int=None, 
                totcrdt:int=None, 
                studied_courses:str=None, 
                # pref:str=None, 
                # wishlist:str=None, 
                # schedule:str=None, 
                permission:int=None,
                collage: str = None,):
        super().__init__()
        self.id = id
        self.name = name
        self.password = pwd
        self.school = school
        self.collage = collage
        if not collage:
            self.collage = random.choice(['Shaw', 'Diligentia', 'Muse', 'Harmonia'])
        self.major = major
        self.year = year
        self.tot_credit = totcrdt
        self.studied_courses = studied_courses
        # self.preference = pref
        # self.wishlist = wishlist
        # self.schedule = schedule
        self.permission = permission
            
    @property
    def password(self): 
        return self.__password

# pwd 应在传输前加密？
    @password.setter
    def password(self, row_password):
        self.__password = hashlib.md5(row_password.encode('utf-8')).hexdigest()

    def check_password(self, row_password):
        result = self.__password == hashlib.md5(row_password.encode('utf-8')).hexdigest()
        return result

    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'

    # tell python how convert the class object into a dictionary ready to jsonify
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "permission": self.permission,
            "school": self.school,
            "major": self.major,
            "year": self.year,
            "totalCredit": self.tot_credit,
            "studiedCourses": self.studied_courses
        }
    
    def to_dict(self):
        dic = {
            "stuid": self.id,
            "name" : self.name,
            "school": self.school,
            "major": self.major,
            "year" : self.year,
            "tot_credit" : self.totcrdt,
            # "studied_courses" : self.studied_courses,
        }
        return


class Instructor(db.Model):
    __tablename__ = 'Instructor'
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    school = db.Column(db.String(10))
    isLecturer = db.Column(db.Boolean)
    website = db.Column(db.String(255))
    profile = db.Column(db.Text)
    # img

    def __init__(self,
                 name,
                 school = None,
                 isLecturer = None,
                 website = None):
        super().__init__()
        self.name = name
        self.school = school
        self.isLecturer = isLecturer
        self.website = website

    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'


class Session(db.Model):
    __tablename__ = 'Session'
    sno = db.Column(db.Integer, primary_key=True)
    course = db.Column(db.String(10), nullable=False)
    type = db.Column(db.String(10), nullable=False)  # db.Enum
    # course_name = db.Column(db.String(50), nullable=False)
    instr = db.Column(db.Text)  # str split(' ') full code, with instr id
    # instr_id = db.Column(db.Integer)
    venue = db.Column(db.String(20))
    capacity = db.Column(db.Integer)
    curEnroll = db.Column(db.Integer)
    class1 = db.Column(db.String(20))  # str split('-')
    class2 = db.Column(db.String(20))  # str split('-')
    

    def __init__(self, 
                course_code:str, 
                type:str,
                instr:str = None,
                venue:str = None,
                capacity: int = None,
                class1:str = None, 
                class2:str = None):
        super().__init__()
        self.course = course_code
        self.type = type
        self.instr = instr
        self.venue = venue
        self.capacity = capacity
        self.curEnroll = 0
        if not capacity:
            capacity = [30,150][type=='lec']
            self.curEnroll = random.randint(0,capacity)
        self.class1 = class1
        self.class2 = class2




    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'

# Search lec/tut sessions: session.course = ...
class Course(db.Model):
    __tablename__ = 'Course'
    # id = db.Column(db.String(20), primary_key=True, nullable=False)
    code = db.Column(db.String(10), primary_key=True, nullable=False) 
    # prefix = db.Column(db.String(5))
    # suffix = db.Column(db.Integer)
    units = db.Column(db.Integer)
    name = db.Column(db.String(50))
    school = db.Column(db.String(10))
    units = db.Column(db.Integer)
    prereqs = db.Column(db.Text)     #str split(' ') full code
    intro = db.Column(db.Text)
    markingCriteria = db.Column(db.Text)
    # str split(';') then split(','). EG:
    syllabus = db.Column(db.String(255))
    # lecturers = db.Column(db.Text)
    # tutors = db.Column(db.Text)

    def __init__(self,
                 code:str,
                 name:str = None,
                 school:str = None,
                 units:int = None,
                 prereqs: str = None,
                 intro: str = None,
                 syllabus: str = 'https://www.lgulife.com/p/422/',
                 markingCriteria: str = 'Assignment:20%,Midterm Exam:30%,Final Exam:50%'
                # lecturers = None,
                #  tutors = None
                ):
        super().__init__()
        self.code = code
        # self.prefix = code[0:3]
        # self.suffix = int(code[3:7])
        self.name = name
        self.school = school
        self.units = units
        self.prereqs = prereqs
        self.intro = intro
        self.syllabus = syllabus
        self.markingCriteria = markingCriteria
        # self.lecturers = lecturers
        # self.tutors = tutors

    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'

# no need
# class Course_Session(db.Model):
#     __tablename__ = 'Course_Session'
#     course_code = db.Column(db.String(10), primary_key=True, nullable=False) 
#     session_no = db.Column(db.String(20), primary_key=True, nullable=False)


#     def __repr__(self):
#         # return f'<Database Table {self.__tablename__}>'
#         return f'Course code: {self.course_code}, Session No: {self.session_no}'


class MajorCourse(db.Model):
    __tablename__ = 'MajorCourse'
    major = db.Column(db.String(10), primary_key=True, nullable=False)
    year = db.Column(db.Integer, primary_key=True, nullable=False)
    required = db.Column(db.Text)
    elective = db.Column(db.Text)
    package = db.Column(db.Text)
    # school = db.Column(db.String(10))

    def __init__(self,
                 major,
                 year,
                 required = None,
                 elective = None,
                 package = None):
        super().__init__()
        self.major = major
        self.year = year
        self.required = required
        self.elective = elective
        self.package = package

    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'

# no need
# class SchoolCourse(db.Model):
#     __tablename__ = 'SchoolCourse'
#     school = db.Column(db.String(10), primary_key=True, nullable=False)
#     package = db.Column(db.Text)

#     def __repr__(self):
#         return f'<Database Table {self.__tablename__}>'

class SemesterCourse(db.Model):
    __tablename__ = 'SchoolCourse'
    semester = db.Column(db.String(20), primary_key=True, nullable=False)
    courses = db.Column(db.Text)

    def __init__(self,
                semester,
                courses = None):
        super().__init__()
        self.semester = semester
        self.courses = courses

    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'

class Comment(db.Model):
    __tablename__ = 'Comment'
    id = db.Column(db.Integer, primary_key=True)
    # ,db.ForeignKey('user.id')
    stuid = db.Column(db.Integer, nullable=False)
    stuName = db.Column(db.String(20))
    course = db.Column(db.String(10), nullable=False)
    # ,db.ForeignKey('course.id')
    time = db.Column(db.DateTime, default=datetime.now)
    rating = db.Column(db.Integer)
    content = db.Column(db.Text)
    # question = db.relationship('Question', backref=db.backref('comment',order_by=creat_time.desc))
    # author=db.relationship('User',backref=db.backref('comment'))
    keywords = db.Column(db.String(100))

    def __init__(self,
                 stuid,
                 stuName,
                 course_code,
                 rating = None,
                 content = None,
                 keywords = None):
        super().__init__()
        self.stuid = stuid
        self.stuName = stuName
        self.course = course_code
        self.rating = rating
        self.content = content
        self.keywords = keywords

    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'


#  test only

@app.route("/")
def hello():
    return "Hello Database!"


# # @app.route("/add", methods=['GET'])
# def add():
#     record = Course_Session(course_code='CSC4001', session_no='01')
#     db.session.add(record)
#     db.session.commit()
#     return 'done'


# # @app.route("/query", methods=['GET'])
# def query():
#     record = Course_Session.query.filter(
#         Course_Session.course_code == 'CSC4001').first()
#     print(record.course_code, record.session_no)
#     print(record)
#     return 'done'


# # @app.route("/change", methods=['GET'])
# def change():
#     record = Course_Session.query.filter(
#         Course_Session.course_code == 'CSC4001').first()
#     record.session_no = '02'
#     print(record.course_code, record.session_no)
#     db.session.commit()
#     return 'done'


# # @app.route("/dela", methods=['GET'])
# def dela():
#     record = Course_Session.query.filter(
#         Course_Session.course_code == 'CSC4001').first()
#     if record is not None:
#         db.session.delete(record)
#         db.session.commit()
#     return 'done'


# if __name__ == '__main__':

    # app.run()
    # db.init_app(app)
#     db.create_all()

#     dela()
#     add()
#     query()
#     change()
#     dela()

    # db.drop_all()





