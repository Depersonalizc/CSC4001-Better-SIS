import sqlite3
import hashlib
from datetime import datetime
from flask import Flask
# from flask.globals import session
from flask_sqlalchemy import SQLAlchemy


SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS

db = SQLAlchemy(app)
# db.init_app(app)

class Course_Session(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)  #autoincrement=True
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    collage = db.Column(db.String(20), nullable=False) #db.Enum("Consumer", "Designer", "Company"), default=
    school = db.Column(db.String(10), nullable=False)
    major = db.Column(db.String(10), nullable=False)
    permission = db.Column(db.Integer, nullable=False)
    # UserImage = db.Column(db.BLOB)

    @property
    def password(self):  # 外部使用
        return self.password

# pwd 应在传输前加密？
    @password.setter
    def password(self, row_password):
        self.password = hashlib.md5(row_password.encode('utf-8')) 

    def check_password(self, row_password):
        result = self.password == hashlib.md5(row_password)
        return result

    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'

    # tell python how convert the class object into a dictionary ready to jsonify
    # def serialize(self):
    #     return {
    #         "username": self.username,
    #         "email": self.email
    #     }


class Comment(db.Model):
    __tablename__ = 'comment'
    # 建立一个表log
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    author_id = db.Column(db.Integer,nullable=False) #,db.ForeignKey('user.id')
    course_code = db.Column(db.String(10), nullable=False)  #,db.ForeignKey('course.id')
    creat_time = db.Column(db.DateTime,default=datetime.now)
    detail = db.Column(db.Text,nullable=False)
    # question = db.relationship('Question', backref=db.backref('comment',order_by=creat_time.desc))
    # author=db.relationship('User',backref=db.backref('comment'))

    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'

class Instructor(db.Model):
    __tablename__ = 'instructor'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    school = db.Column(db.String(10), nullable=False)
    isLecturer = db.Column(db.Boolean, nullable=False)
    # website = db.Column(db.String(255), nullable=False)
    # profile
    # img

    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'

class Session(db.Model):
    __tablename__ = 'session'
    no = db.Column(db.String(20), primary_key=True, nullable=False)
    course_code = db.Column(db.String(10), nullable=False)
    course_name = db.Column(db.String(50), nullable=False)
    instr_name = db.Column(db.String(50), nullable=False)
    instr_id = db.Column(db.Integer, nullable=False)
    session_type = db.Column(db.String(10), nullable=False) #db.Enum
    # class

    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'


    

class Course(db.Model):
    __tablename__ = 'course'
    # id = db.Column(db.String(20), primary_key=True, nullable=False)
    #?? why code int
    code = db.Column(db.String(10), primary_key=True, nullable=False) 
    name = db.Column(db.String(50), nullable=False)
    school = db.Column(db.String(10), nullable=False)
    units = db.Column(db.Integer, nullable=False)
    # lecturers
    # tutors
    # ??? dept


    def __repr__(self):
        return f'<Database Table {self.__tablename__}>'


class Course_Session(db.Model):
    __tablename__ = 'Course_Session'
    course_code = db.Column(db.String(10), primary_key=True, nullable=False) 
    session_no = db.Column(db.String(20), primary_key=True, nullable=False)


    def __repr__(self):
        # return f'<Database Table {self.__tablename__}>'
        return f'Course code: {self.course_code}, Session No: {self.session_no}'


#  test

@app.route("/")
def hello():
    return "Hello World!"


# @app.route("/add", methods=['GET'])
def add():
    record = Course_Session(course_code='CSC4001', session_no='01')
    db.session.add(record)
    db.session.commit()
    return 'done'


# @app.route("/query", methods=['GET'])
def query():
    record = Course_Session.query.filter(
        Course_Session.course_code == 'CSC4001').first()
    print(record.course_code, record.session_no)
    print(record)
    return 'done'


# @app.route("/change", methods=['GET'])
def change():
    record = Course_Session.query.filter(
        Course_Session.course_code == 'CSC4001').first()
    record.session_no = '02'
    print(record.course_code, record.session_no)
    db.session.commit()
    return 'done'


# @app.route("/dela", methods=['GET'])
def dela():
    record = Course_Session.query.filter(
        Course_Session.course_code == 'CSC4001').first()
    if record is not None:
        db.session.delete(record)
        db.session.commit()
    return 'done'


if __name__ == '__main__':

    # app.run()
    # db.init_app(app)
    db.create_all()

    dela()
    add()
    query()
    change()
    dela()





