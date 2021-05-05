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


    db.session.add(dbMdl.Course(code='CSC4001', name='Software Engineering', school='SDS',
                                units=3, prereqs='CSC1001 CSC3002'))

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






    db.session.add(dbMdl.Instructor('Jane You', school='SDS', isLecturer=True, website='...'))
    db.session.add(dbMdl.Instructor('Che Haoxuan', school='SDS', isLecturer=False, website='...'))
    db.session.add(dbMdl.Instructor('Han Xiaoguang', school='SSE', isLecturer=True, website='...'))
    db.session.add(dbMdl.Instructor('Cai Wei', school='SDS', isLecturer=True, website='...'))
    db.session.add(dbMdl.Instructor('lyx', school='SDS', isLecturer=False, website='...'))
    db.session.add(dbMdl.Instructor('lzy', school='SDS', isLecturer=False, website='...'))
    db.session.add(dbMdl.Instructor('ca', school='SDS', isLecturer=False, website='...'))
    db.session.add(dbMdl.Instructor('Clement', school='SDS', isLecturer=True, website='...'))
    db.session.add(dbMdl.Instructor('Wang Haijin', school='SDS', isLecturer=False, website='...'))
    db.session.add(dbMdl.Instructor('Huang Rui', school='SDS', isLecturer=True, website='...'))
    db.session.add(dbMdl.Instructor('Zhu Yifan', school='SDS', isLecturer=False, website='...'))
    db.session.add(dbMdl.Instructor('Hsien-Da Huang', school='LHS', isLecturer=True, website='...'))
    db.session.add(dbMdl.Instructor('HUANG Yixian', school='LHS', isLecturer=False, website='...'))
    db.session.add(dbMdl.Instructor('Yi Cao', school='SME', isLecturer=True, website='...'))
    db.session.add(dbMdl.Instructor('HUANG Yixian', school='SME', isLecturer=False, website='...'))
    db.session.add(dbMdl.Instructor('Yong Qin Chen', school='HSS', isLecturer=True, website='...'))
    db.session.add(dbMdl.Instructor('Chen WANG', school='HSS', isLecturer=True, website='...'))



    db.session.add(dbMdl.Instructor('lecturer1', school='school', isLecturer=True, website='abc'))
    db.session.add(dbMdl.Instructor('tutor1', school='school', isLecturer=False, website='def'))
    db.session.add(dbMdl.Instructor('tutor2', school='school', isLecturer=False, website='ghi'))




    db.session.add(
        dbMdl.Session(course_code='CSC4001',
                    type='lec', instr='1', venue='TA101',
                    class1='4 15:30-4 16:50',
                    class2='5 14:30-5 15:50')
                )

    db.session.add(
        dbMdl.Session(course_code='CSC4001',
                    type='tut', instr='2', venue='CD202',
                    class1='4 18:00-4 18:50')
                )

    db.session.add(
        dbMdl.Session(course_code='CSC4001',
                    type='tut', instr='2', venue='CD202',
                    class1='5 18:00-5 18:50')
                )

    db.session.add(
        dbMdl.Session(course_code='CSC4001',
                    type='tut', instr='2', venue='CD202',
                    class1='5 20:00-5 20:50')
                )

    db.session.add(
        dbMdl.Session(course_code='CSC1001',
                    type='lec', instr='3', venue='TD101',
                    class1='1 08:30-1 09:50',
                    class2='3 08:30-3 09:50')
                )

    db.session.add(
        dbMdl.Session(course_code='CSC1001',
                    type='lec', instr='4', venue='TD101',
                    class1='2 08:30-2 09:50',
                    class2='4 08:30-4 09:50')
                )

    db.session.add(
        dbMdl.Session(course_code='CSC1001',
                    type='tut', instr='5', venue='TD110',
                    class1='1 18:00-1 18:50')
                )

    db.session.add(
        dbMdl.Session(course_code='CSC1001',
                    type='tut', instr='6', venue='TD110',
                    class1='1 19:00-1 19:50')
                )

    db.session.add(
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

    db.session.commit()


if __name__ == '__main__':
    data_insert()