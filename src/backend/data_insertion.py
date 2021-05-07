import DB.dbModels as dbMdl
from DB.dbModels import db

db.drop_all()
db.create_all()

def data_insert():
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

    # add user
    # for specific user
    db.session.add(dbMdl.Student(id='118010158', name='Zeyu Li', pwd='123abc',gender = True, school='SDS', college='Harmonia',
                   major='CSE', year=3, totcrdt=108, studied_courses='CSC1001 CSC3002 CSC4001 CSC3050 EIE4007 ECO2011', permission=1))
    db.session.add(dbMdl.Student(id='118010154', name='Yihan Li', pwd='123', gender=True, school='SDS', college='Shaw',
                   major='CSE', year=3, totcrdt=90, studied_courses='CSC1001 CSC3002 CSC4001 CSC3050 CSC4020', permission=1))
 
    # for default user
    db.session.add(dbMdl.Student(id='117010000', name='abc',
                   pwd='123abc', studied_courses='ECO2011 GEB2041 CSC4001 MAT3050'))
    db.session.add(dbMdl.Student(id='118020001', name='def',
                   pwd='123abc', studied_courses='ECO2011 CSC3002 EIE4001 CSC3050'))
    db.session.add(dbMdl.Student(id='119030002', name='ghi',
                   pwd='123abc', studied_courses='ECO2011 CSC3002 EIE4001 CSC3050'))



    # add course
    db.session.add(dbMdl.Course(code='CSC4001', name='Software Engineering', school='SDS',
                                units=3, prereqs='CSC1001 CSC3002', intro="The main goal of this course is to illustrate the basic concepts, knowledge framework and life cycle model \
                                    of software engineering from an engineering practitioner’s point of view. The topics include: software processes, agile software development, requirement \
                                        engineering, system modelling, architectural design, design and implementation, software testing, software evolution, software measurement, software reuse, \
                                            etc. The course also illustrates and practices with common CASE tools used in software engineering and software management.\
                                                This course assumes the students have acquired essential skills in software development with one to two programming languages."))

    db.session.add(dbMdl.Course(code='CSC1001', name='Python', school='SDS',
                                units=3, prereqs=''))

    db.session.add(dbMdl.Course(code='CSC3100', name='Data Structure', school='SDS',
                                units=3, prereqs='CSC1001'))
    db.session.add(dbMdl.Course(code='CSC3170', name='Database System', school='SDS',
                                units=3, prereqs='CSC1001 MAT1001'))
    db.session.add(dbMdl.Course(code='CSC3002', name='CXX', school='SDS',
                                units=3, prereqs='CSC1001'))
    db.session.add(dbMdl.Course(code='CSC3050', name='Computer Architecture', school='SDS',
                                units=3, prereqs='CSC1001 CSC3002'))
    db.session.add(dbMdl.Course(code='BIM3001', name='Bioinformatics', school='LHS',
                                units=3, prereqs='BIO1000'))
    db.session.add(dbMdl.Course(code='ACT2111', name='Introductory Financial Accounting', school='SME',
                                units=3, prereqs=''))
    db.session.add(dbMdl.Course(code='GEB3201', name='Global Environmental Challenges', school='HSS',
                                units=3, prereqs=''))
    db.session.add(dbMdl.Course(code='PED1002', name='Fitness and Health-Frisbee', school='HSS',
                                units=1, prereqs='PED1001'))





    # add instr
    db.session.add(dbMdl.Instructor('Jane You', school='SDS', isLecturer=True, website='https://www.comp.polyu.edu.hk/en-us/staffs/detail/1261', email = 'csyjia@comp.polyu.edu.hk', profile = "Prof. You is currently a professor in the Department of Computing at the Hong Kong Polytechnic University. Prof. You obtained her BEng. in Electronic Engineering from Xi’an Jiaotong University in 1986 and Ph.D in Computer Science from La Trobe University, Australia in 1992. She was a lecturer at the University of South Australia and senior lecturer (tenured) at Griffith University from 1993 till 2002. Prof. You was awarded French Foreign Ministry International Postdoctoral Fellowship in 1993 and worked on the project on real-time object recognition and tracking at Universite Paris XI. She also obtained the Academic Certificate issued by French Education Ministry in 1994."))
    db.session.add(dbMdl.Instructor('Che Haoxuan', school='SDS', isLecturer=False))
    db.session.add(dbMdl.Instructor('Han Xiaoguang', school='SSE', isLecturer=True))
    db.session.add(dbMdl.Instructor('Cai Wei', school='SDS', isLecturer=True))
    db.session.add(dbMdl.Instructor('lyx', school='SDS', isLecturer=False))
    db.session.add(dbMdl.Instructor('lzy', school='SDS', isLecturer=False))
    db.session.add(dbMdl.Instructor('ca', school='SDS', isLecturer=False))
    db.session.add(dbMdl.Instructor('Clement', school='SDS', isLecturer=True))
    db.session.add(dbMdl.Instructor('Wang Haijin', school='SDS', isLecturer=False))
    db.session.add(dbMdl.Instructor('Huang Rui', school='SDS', isLecturer=True))
    db.session.add(dbMdl.Instructor('Zhu Yifan', school='SDS', isLecturer=False))
    db.session.add(dbMdl.Instructor('Hsien-Da Huang', school='LHS', isLecturer=True))
    db.session.add(dbMdl.Instructor('HUANG Yixian', school='LHS', isLecturer=False))
    db.session.add(dbMdl.Instructor('Yi Cao', school='SME', isLecturer=True))
    db.session.add(dbMdl.Instructor('HUANG Yixian', school='SME', isLecturer=False))
    db.session.add(dbMdl.Instructor('Yong Qin Chen', school='HSS', isLecturer=True))
    db.session.add(dbMdl.Instructor('Chen WANG', school='HSS', isLecturer=True))



    db.session.add(dbMdl.Instructor('lecturer1', school='school', isLecturer=True, website='abc'))
    db.session.add(dbMdl.Instructor('tutor1', school='school', isLecturer=False, website='def'))
    db.session.add(dbMdl.Instructor('tutor2', school='school', isLecturer=False, website='ghi'))



    # add session
    db.session.add(#1
        dbMdl.Session(course_code='CSC4001',
                    type='lec', instr='1', venue='TA101',
                    class1='4 15:30-4 16:50',
                    class2='5 14:30-5 15:50')
                )
    db.session.add(#2
        dbMdl.Session(course_code='CSC4001',
                    type='tut', instr='2', venue='CD202',
                    class1='4 18:00-4 18:50')
                )
    db.session.add(#3
        dbMdl.Session(course_code='CSC4001',
                    type='tut', instr='2', venue='CD202',
                    class1='5 18:00-5 18:50')
                )
    db.session.add(#4
        dbMdl.Session(course_code='CSC4001',
                    type='tut', instr='2', venue='CD202',
                    class1='5 20:00-5 20:50')
                )
    db.session.add(#5
        dbMdl.Session(course_code='CSC1001',
                    type='lec', instr='3', venue='TD101',
                    class1='1 08:30-1 09:50',
                    class2='3 08:30-3 09:50')
                )
    db.session.add(#6
        dbMdl.Session(course_code='CSC1001',
                    type='lec', instr='4', venue='TD101',
                    class1='2 08:30-2 09:50',
                    class2='4 08:30-4 09:50')
                )
    db.session.add(#7
        dbMdl.Session(course_code='CSC1001',
                    type='tut', instr='5', venue='TD110',
                    class1='1 18:00-1 18:50')
                )
    db.session.add(#8
        dbMdl.Session(course_code='CSC1001',
                    type='tut', instr='6', venue='TD110',
                    class1='1 19:00-1 19:50')
                )
    db.session.add(#9
        dbMdl.Session(course_code='CSC3100',
                    type='lec', instr='1', venue='TB102',
                    class1='1 08:30-1 09:50',
                    class2='3 08:30-3 09:50')
                )
    db.session.add(
        dbMdl.Session(course_code='CSC3100',
                    type='tut', instr='7', venue='TA305',
                    class1='3 19:00-3 20:50')
                )
    db.session.add(
        dbMdl.Session(course_code='CSC3170',
                    type='lec', instr='8', venue='TB105',
                    class1='1 10:30-1 11:50',
                    class2='3 10:30-3 11:50')
                )
    db.session.add(
        dbMdl.Session(course_code='CSC3170',
                    type='tut', instr='9', venue='TA305',
                    class1='4 19:00-3 20:50')
                )
    db.session.add(
        dbMdl.Session(course_code='CSC3002',
                    type='lec', instr='10', venue='TB201',
                    class1='2 10:30-1 11:50',
                    class2='4 10:30-3 11:50')
                )
    db.session.add(
        dbMdl.Session(course_code='CSC3002',
                    type='tut', instr='11', venue='TA304',
                    class1='4 18:30-3 18:50')
                )
    db.session.add(
        dbMdl.Session(course_code='BIM3001',
                    type='lec', instr='12', venue='TD206',
                    class1='1 08:30-1 09:50',
                    class2='3 08:30-3 09:50')
                )
    db.session.add(
        dbMdl.Session(course_code='BIM3001',
                    type='tut', instr='13', venue='TA301',
                    class1='1 19:00-1 19:50')
                )
    db.session.add(
        dbMdl.Session(course_code='ACT2111',
                    type='lec', instr='14', venue='ZR206',
                    class1='2 13:30-2 14:50',
                    class2='4 13:30-4 14:50')
                )
    db.session.add(
        dbMdl.Session(course_code='GEB3201',
                    type='lec', instr='15', venue='TC305',
                    class1='3 15:30-3 16:50',
                    class2='4 15:30-4 16:50')
                )
    db.session.add(
        dbMdl.Session(course_code='PED1002',
                    type='lec', instr='16', venue='SportsHall',
                    class1='2 10:30-2 12:20',
                    class2='4 15:30-4 16:50')
                )



    # add Comment
    db.session.add(
        dbMdl.Comment(stuid='118010158', stuName = 'Zeyu Li',
                      course_code='CSC4001', rating=5,
                      content='Most wonderful course I have ever taken!')
    )
    db.session.add(
        dbMdl.Comment(stuid='118010154', stuName='Yihan Li',
                      course_code='CSC4001', rating=4,
                      content="Salute prof and TA for their serious work.")
    )
    db.session.add(
        dbMdl.Comment(stuid='118010158', stuName='Zeyu Li',
                      course_code='CSC3150', rating=4,
                      content='Good Course!')
    )
    db.session.add(
        dbMdl.Comment(stuid='118010158', stuName='Zeyu Li',
                      course_code='CSC3170', rating=4,
                      content='Good Course!')
    )
    db.session.add(
        dbMdl.Comment(stuid='118010158', stuName='Zeyu Li',
                      course_code='CSC3002', rating=4,
                      content='Good Course!')
    )
    db.session.add(
        dbMdl.Comment(stuid='118010158', stuName='Zeyu Li',
                      course_code='CSC3100', rating=1,
                      content='Too hard for me.')
    )


     


    db.session.commit()


if __name__ == '__main__':
    data_insert()
