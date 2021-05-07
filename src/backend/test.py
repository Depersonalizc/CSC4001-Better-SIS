import unittest
import time
import os
from utils.printing import iter_to_str
from course import Course, Instructor, Session
from student import Student
from schedule import Schedule
from get_instance import get_student, get_course, courses, instructors
from DB.dbModels import db
import DB.dbModels as dbMdl


'''
    Unit Test
'''


class ProjectUnitTest(unittest.TestCase):
    def data_insert_test(self):
        db.drop_all()
        db.create_all()
        db.session.add(dbMdl.Course(code='CSC4001', name='Software Engineering', school='SDS',
                        units=3, prereqs='CSC1001 CSC3002'))
                        
        db.session.add(dbMdl.Instructor('Jane You', school='SDS', isLecturer=True, website='...'))
        db.session.add(dbMdl.Instructor('Che Haoxuan', school='SDS', isLecturer=False, website='...'))
        
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
        print('Check data insert - case 1...')
        c = dbMdl.Course.query.filter_by(code='CSC4001').first()
        self.assertEqual(c.name, 'Software Engineering')
        time.sleep(0.2)

        print('Check data insert - case 2...')
        i = dbMdl.Instructor.query.filter_by(name='Jane You').first()
        self.assertEqual(i.name, 'Jane You')
        time.sleep(0.2)

        print('Check data insert - case 3...')
        s = dbMdl.Session.query.filter_by(course='CSC4001', class1='4 15:30-4 16:50').first()
        self.assertEqual(s.class2, '5 14:30-5 15:50')
        time.sleep(0.2)
        print('Pass Data Insert Test        [--->                                ] [ 1 / 12 ]')
        time.sleep(0.2)
        print()

    def course_class_test(self):
        '''//// Course Class Test ////'''
        # Define courses and instructors
        c = Course('CSC', 4001, 'Software Engineering', credit_units=3)
        jy = Instructor('Jane YOU',     'CSC', is_lecturer=True)
        jm = Instructor('Jane ME',      'CSC', is_lecturer=True)
        t1 = Instructor('Shiping ZHU',  'CSC', is_lecturer=False)
        t2 = Instructor('Yangsheng XU', 'CSC', is_lecturer=False)

        # Add lecture sessions
        c.add_session(1, {jy}, 'TA101', 'lec', ('1 08:30', '1 09:50'), ('3 10:30', '3 12:50'))
        c.add_session(2, {jy}, 'TA101', 'lec', ('2 08:30', '2 09:50'), ('4 10:30', '4 12:50'))
        c.add_session(
            3, {jy}, 'TA101', 'lec', ('3 08:30', '3 09:50'), ('5 10:30', '5 12:50')
        )  # Conflicts with the session below
        c.add_session(
            4, {jm}, 'TA102', 'lec', ('3 09:00', '3 10:20'), ('5 11:30', '5 13:50')
        )  # Conflicts with the session above

        # Add tutorial sessions
        c.add_session(1, {t1, t2}, 'TA101', 'tut', ('2 19:30', '2 20:30'))
        c.add_session(2, {t1, t2}, 'TA101',  'tut', ('3 19:30', '3 20:30'))
        c.add_session(3, {t1, t2, jm}, 'TA101', 'tut', ('3 18:00', '3 19:20'))

        # Display course sessions
        self.assertEqual(c.full_code, 'CSC4001')
        print('Check course code...')
        time.sleep(0.2)
        self.assertIn(jy,c.lecturers)
        print('Check lecturers...')
        time.sleep(0.2)
        self.assertIn(t1,c.tutors)
        print('Check tutors...')
        time.sleep(0.2)
        self.assertEqual(str(c.tut_sessions[0].class1.start), 'Tue 19:30')
        print('Check session time...')
        time.sleep(0.2)
        '''//// Course Class Test ////'''
        print('')
        time.sleep(0.2)

        '''//// Course Conflict Test ////'''
        # Demo for conflict checking
        # print('Conflict checking...')
        l0 = c.lec_sessions[0]
        l1 = c.lec_sessions[1]
        l2 = c.lec_sessions[2]
        l3 = c.lec_sessions[3]
        for l in l0, l1, l2:
            overlaps = l.overlaps_with_session(l3)
            if overlaps:  # List[TimeSlot]
                pass
                # print("Conflicts found between:\n")
                print('Check conflict detect...')
                time.sleep(0.2)
                self.assertEqual(len(overlaps), 2)
                self.assertEqual(str(overlaps[0]), '[Wed 09:00 -- Wed 09:50]  (0:50:00)')
                self.assertEqual(str(overlaps[1]), '[Fri 11:30 -- Fri 12:50]  (1:20:00)')
                # print('\nwith overlapping time slots:')
                # print(iter_to_str(overlaps, sep='\n'))
            else:  # Empty list
                pass
                # print('No conflicts found!')
        '''//// Course Conflict Test ////'''
        time.sleep(0.2)
        # os.system('cls')
        print('Pass Session_class_test      [------>                             ] [ 2 / 12 ]')
        print('Pass Instructor_class_test   [--------->                          ] [ 3 / 12 ]')
        print('Pass Course_class_test       [------------>                       ] [ 4 / 12 ]')
        print('Pass Course Conflict Test    [--------------->                    ] [ 5 / 12 ]')
        print('\n\n')

    def get_course_test(self):
        '''//// get_course() Class Test ////'''
        print('Check get course...')
        get_course('CSC4001')
        self.assertIn('CSC4001', [str(c) for c in courses])
        time.sleep(0.2)
        '''//// get_course() Class Test ////'''
        print('Pass get_course_test         [------------------>                 ] [ 6 / 12 ]')
        time.sleep(0.2)
        print()


    def student_class_test(self):
        '''//// Student Class Test ////'''
        s = Student('118010154', 'lyh', 'SDS', 'CSE', 3, 90, ['CSC4001', 'CSC1001'])
        string = 'Student ID:     118010154\n'\
               + 'Student name:   lyh\n'\
               + 'Student school: SDS\n'\
               + 'Student major:  CSE\n'\
               + 'Year of study:  3\n'\
               + 'Total credits:  90\n'\
               + 'Student major:  CSE\n'\
               + 'Studied courses:\n'\
               + '\tCSC4001 CSC1001'
        self.assertEqual(s.str(), string)
        print('Check Student Class...')
        time.sleep(0.2)
        # print(string)
        '''//// Student Class Test ////'''
        print('Pass Student_class_test      [--------------------->              ] [ 7 / 12 ]')
        print()

    def schedule_class_test(self):
        '''//// Schedule Class Test ////'''
        # Instructors
        jy = Instructor('Jane YOU',       'CSC', is_lecturer=True)
        jm = Instructor('Jane ME',        'CSC', is_lecturer=True)
        cl = Instructor('Clement LEUNG',  'CSC', is_lecturer=True)
        aj = Instructor('Arnulf Jentzen', 'DDA', is_lecturer=True)
        cw = Instructor('Chenye Wu',      'CSC', is_lecturer=True)
        jw = Instructor('Jian WANG',      'SME', is_lecturer=True)

        t1 = Instructor('Songyang Ge',    'CSC', is_lecturer=False)
        t2 = Instructor('Yushun Zhang',   'SDS', is_lecturer=False)
        t3 = Instructor('Haijin WANG',    'CSC', is_lecturer=False)
        t4 = Instructor('Shiping ZHU',    'CSC', is_lecturer=False)
        t5 = Instructor('Haoxuan Che',    'CSC', is_lecturer=False)
        t6 = Instructor('Kai Li',         'SDS', is_lecturer=False)
        t7 = Instructor('Chi Li',         'SDS', is_lecturer=False)
        t8 = Instructor('Junyi GE',       'SME', is_lecturer=False)
        t9 = Instructor('Ang CHEN',       'SDS', is_lecturer=False)

        # Course
        CSC4001 = Course('CSC', 4001, 'Software Engineering', credit_units=3)
        CSC4001.add_session(1501, {jy}, 'TA101', 'lec', ('1 08:30', '1 09:50'), ('3 08:30', '3 09:50'))
        CSC4001.add_session(1511, {t1, t2}, 'TA101', 'tut', ('2 19:30', '2 20:30'))
        CSC4001.add_session(1512, {t1, t2}, 'TA101', 'tut', ('3 19:30', '3 20:30'))
        CSC4001.add_session(1513, {t1, t2}, 'TA101', 'tut', ('5 19:00', '5 19:50'))

        CSC3170 = Course('CSC', 3170, 'Database System', credit_units=3)
        CSC3170.add_session(1601, {cl}, 'TB202', 'lec', ('1 8:30', '1 8:50'), ('3 8:30', '3 8:50'))
        CSC3170.add_session(1602, {cl}, 'TB202', 'lec', ('2 9:30', '2 9:50'), ('4 9:30', '4 9:50'))
        CSC3170.add_session(1611, {t3, t4}, 'TB202', 'tut', ('1 18:00', '1 18:50'))
        CSC3170.add_session(1612, {t3, t4}, 'TB202', 'tut', ('1 19:00', '1 19:50'))
        CSC3170.add_session(1613, {t3, t4}, 'TB202', 'tut', ('2 18:00', '2 18:50'))
        CSC3170.add_session(1614, {t3, t4}, 'TB202', 'tut', ('2 19:00', '2 19:50'))

        FIN4060 = Course('FIN', 4060, 'Supermarket Theory', credit_units=3, prereqs={'CSC3170'})
        FIN4060.add_session(2000, {jw}, 'TC414', 'lec', ('2 13:30', '2 14:50'), ('4 13:30', '4 14:50'))
        FIN4060.add_session(2001, {jw}, 'TC414', 'lec', ('2 15:30', '2 16:50'), ('4 15:30', '4 16:50'))
        FIN4060.add_session(2020, {t8}, 'CD101', 'tut', ('1 18:00', '1 18:50'))
        FIN4060.add_session(2021, {t9}, 'CD101', 'tut', ('1 19:00', '1 19:50'))

        DDA4250 = Course('DDA', 4250, 'Mathematical Introduction to Deep Learning',
                        credit_units=3, prereqs={'CSC4001', 'CSC3170'})
        DDA4250.add_session(1701, {aj}, 'ZOOM', 'lec', ('2 15:30', '2 17:20'), ('5 20:00', '5 21:50'))
        DDA4250.add_session(1711, {t5}, 'ZOOM', 'tut', ('4 19:00', '4 19:50'))

        CSC4008 = Course('CSC', 4008, 'Data Mining', credit_units=3)
        CSC4008.add_session(1801, {cw}, 'TB103', 'lec', ('2 13:30', '2 14:50'), ('4 13:30', '4 14:50'))
        CSC4008.add_session(1802, {cw}, 'TB103', 'lec', ('2 15:30', '2 16:50'), ('4 15:30', '4 16:50'))
        CSC4008.add_session(1811, {t6, t7}, 'TD101', 'tut', ('2 18:00', '2 18:50'))
        CSC4008.add_session(1812, {t6, t7}, 'TD101', 'tut', ('2 19:00', '2 19:50'))
        CSC4008.add_session(1813, {t6, t7}, 'TD101', 'tut', ('3 19:00', '3 19:50'))

        # Student logs in and set preference
        # print("Student login")
        stud = Student(stuid=118020158,
                    name='Test Student',
                    school='SDS',
                    major='CSE',
                    year=3,
                    tot_credit=100,
                    studied_courses={'CSC3170'})

        
        # print('Init schedule...')
        sche = Schedule(stud)
        # Student wishes to add the following courses:
        # print('Check Add wish list')
        # for course in FIN4060, DDA4250, CSC4008:
        #     fails = sche.add_course_to_wishlist(course)
        #     if fails:
        #         self.assertEqual(course.full_code, 'DDA4250')
        #         self.assertEqual(str(fails),'[\'CSC4001\']')
        #         # print(f"Failed to wish-list {course.full_code}. Prerequisites {fails} not met.")
        #     else:
        #         # print(f"Wish-listed course {course.full_code}.")
        #         self.assertIn(course.full_code,['FIN4060', 'CSC4008'])
        sche.preference.no_friday = True
        time.sleep(0.2)
        '''//// Schedule Class Test ////'''

        '''//// Auto-schedule Test ////'''
        # Auto-scheduling
        print('Check Auto-scheduling...')
        ret = sche.auto_schedule()
        # print(f"Auto-scheduling {'DONE' if ret else 'FAILED'}!")
        # print(sche)
        # print('Selecting auto-scheduled sessions...')
        incomplete = sche.select_buffer_pkgs()
        self.assertFalse(incomplete)
        if incomplete:
            # print(f"Fails to select sessions in buffer. "
                # f"Packages {incomplete} are incomplete!")
            pass
        else:
            pass
            # print("Successful!")
        # print(sche)
        time.sleep(0.2)
        '''//// Auto-schedule Test ////'''

        '''//// Session Swap Test ////'''
        # Session swap
        # print(FIN4060)
        # Suppose the student wants to swap to another tut session, but not lec
        pkg_toswap = 'FIN4060'
        pkg_idx = sche.find_selected_pkg(pkg_toswap)
        lec_idx = FIN4060.find_session('lec', 2000)
        tut_idx = FIN4060.find_session('tut', 2021)
        if pkg_idx == -1:
            print(f"Can't find package named {pkg_toswap}")
        elif tut_idx == -1:
            print("Can't find tut session numbered 2021")
        else:
            print('Swapping tutorial...')
            self.assertTrue(sche.swap_session(pkg_idx, tut_idx=tut_idx))
            time.sleep(0.2)
            # if sche.swap_session(pkg_idx, tut_idx=tut_idx):
                # print('Successful!')
            # else:
                # print('Failed!')
            # print(sche)
        '''//// Session Swap Test ////'''

        '''//// Remove Package Test ////'''
        # Remove package
        pkg_to_remove = sche.find_selected_pkg(pkg_toswap)
        print('Check Remove package...')
        # print('Successful!' if sche.remove_pkg(pkg_to_remove) else 'Failed!')
        # print(sche)
        self.assertTrue(sche.remove_selected_pkg(pkg_to_remove))
        time.sleep(0.2)
        '''//// Remove Package Test ////'''
        
        '''//// Manual Add Test ////'''
        # Manual add (say FIN4060)
        sche.init_buffer()
        sche.buffer_session(FIN4060, lec_idx=lec_idx)
        # Cannot select package cuz it is incomplete
        print('Check Manual Add...')
        incomplete = sche.select_buffer_pkgs()
        self.assertTrue(incomplete)
        if incomplete:
            # print(f"Fails to select sessions in buffer as it contains incomplete packages.")
            pass
        else:
            # print("Successful!")
            pass
        # Now it is complete
        sche.buffer_session(FIN4060, tut_idx=tut_idx)
        # print('Selecting package...')
        incomplete = sche.select_buffer_pkgs()
        self.assertFalse(incomplete)
        if incomplete:
            # print(f"Fails to select sessions in buffer as it contains incomplete packages.")
            pass
        else:
            pass
            # print("Successful!")
        time.sleep(0.2)
        # print(sche)
        '''//// Manual Add Test ////'''
        
        print('Pass Schdule Class Test     [------------------------>           ] [ 8 / 12 ]')
        print('Pass Auto Schedule Test     [--------------------------->        ] [ 9 / 12 ]')
        print('Pass Session Swap Test      [------------------------------>     ] [ 10 / 12 ]')
        print('Pass Remove Package Test    [--------------------------------->  ] [ 11 / 12 ]')
        print('Pass Manual Add Test        [----------------------------------->] [ 12 / 12 ]')
        time.sleep(0.2)

if __name__ == '__main__':
    t = ProjectUnitTest()
    t.data_insert_test()
    t.course_class_test()
    t.get_course_test()
    t.student_class_test()
    t.schedule_class_test()