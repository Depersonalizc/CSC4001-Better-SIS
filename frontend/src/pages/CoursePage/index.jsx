import React from 'react';

/* 引入样式 */
import './index.less';

/* 引入组件 */
import NavigatorWithTime from '../GeneralComponents/NavigatorWithTime';
import Breadcrumb from '../GeneralComponents/Breadcrumb';
import WeeklySchedule from '../GeneralComponents/WeeklySchedule';
import CourseInfoTable from './CourseInfoTable';

/* 引入Ant Design */
import { 
  Descriptions,
  Typography,
  Rate,
  List,
  Comment,
  Divider,
  Badge,
  Button,
  Table,
} from 'antd';
const { Text, Paragraph } = Typography;
import { 
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons';


/* 引入数据 */
import { 
  CourseTimeSlotList, 
  ComingTimeSlotList,
  CourseMarkingCriteriaData,
  CourseData,
} from '../data.d';
import { CourseCommentData } from '../data.d';
import { useState } from 'react';
import { HomeOutlined } from '@material-ui/icons';



export default function CoursePage(props) {
  const [ coursePageData, setCoursePageData ] = React.useState(() => {
    let paramString = window.location.search.slice(1);
    console.log(`paramString = ${paramString}`);
    let targetIndex = paramString.indexOf("courseTitle");
    let value = "";
    if ( targetIndex !== -1 ) {
      for ( let i = targetIndex; i < paramString.length; ++i ) {
        if ( paramString[i] === '&' || paramString[i] === '/' ) {
          break;
        } else {
          value += paramString[i];
        }
      }
      console.log(`value = ${value}`);
    }
    if ( value.indexOf('=') !== -1 ) {
      value = value.split('=')[1];
      console.log(`final value = ${value}`);

      // get the data
      for (let i = 0; i < CourseData.length; ++i) {
        if ( CourseData[i].title === value ) {
          return CourseData[i];
        }
      }
      throw new Error(`Error in course page courseTitle retrieval: no such ${value} in CourseData`);
    } else {
      throw new Error(`Error in course page courseTitle retrieval: no '=' in value`);
    }
  });
  const [ showComingCourses, setShowComingCourses ] = React.useState(false);
  const [ comingLecture, setComingLecture ] = React.useState([]);
  const [ keepShowingComingCourses, setKeepShowingComingCourses ] = React.useState(false);
  return (
    <div className="course-page">
      <NavigatorWithTime />
      <div className="course-page-body margin-body">
        <Breadcrumb 
          data={[
            {
              href: "/",
              icon: <HomeOutlined className="breadcrumb-icon" />,
              text: "Home",
            },
            {
              href: "",
              icon: <HomeOutlined className="breadcrumb-icon" />,
              text: "选课系统",
            },
            {
              href: "",
              icon: null,
              text: "课程主页",
            },
            {
              href: null,
              icon: null,
              text: coursePageData.title,
            },
          ]}
        />
        <div>
          <div>
            <div className="course-page-prerequisite">
              <span className="small-title">Prerequisites: </span>
              <br />
              <ul>
                <li>CSC1001 <CheckCircleTwoTone twoToneColor="#52c41a"/></li>
                <li>CSC3002 <CheckCircleTwoTone twoToneColor="#52c41a"/></li>
                <li>CSC3010 <CloseCircleTwoTone twoToneColor="#eb2f96"/></li>
              </ul>
            </div>
            {/* <p className="main-title">CSC4001: Software Engineering</p> */}
            <p className="main-title">{coursePageData.fullName}</p>
            <div>
              <p className="large-text">This is your <span className="text-highlight">Major Required</span> course.</p>
            </div>
            <p className="sub-title" style={{marginTop: "8rem",}}>Sessions</p>
            {
              coursePageData.session.map((ele, index) => {
                ele.courseTitle = coursePageData.title;
                return (
                  <CourseInfoTable 
                    key={index}
                    data={ele}
                    sessionList={coursePageData.session}
                    showComingCourses={showComingCourses}
                    setShowComingCourses={setShowComingCourses} 
                    setComingLecture={setComingLecture}
                    keepShowingComingCourses={keepShowingComingCourses}
                    setKeepShowingComingCourses={setKeepShowingComingCourses}
                  />
                )
              })
            }
          </div>
          <div>
            <p className="sub-title">Weekly Schedule</p>
            <div style={{transform: "scale(0.65)", transformOrigin: "10% 20%",}}>
              <WeeklySchedule 
                existsCourseList={CourseTimeSlotList}
                // comingCourseList={ComingTimeSlotList}
                comingCourseList={comingLecture}
                showComingCourses={showComingCourses}
              />
            </div>
          </div>
        </div> 
        <div>
          <div className="course-page-info">
            <div>
              <p className="sub-title">Introduction</p>
              <Paragraph
                ellipsis={{
                  rows: 4,
                  expandable: true,
                  tooltip: false,
                }}
                className="indent-paragraph"
              >
                {coursePageData.introduction}
              {/* This is a fundamental course to provide the general concepts of machine learning. This course provides you the opportunity to learn skills and content to practice and engage in scalable machine learning methods on massive data and to study methods to train/learn/develop computational models from varieties of data. It covers supervised learning, clustering, parametric and nonparametric methods, decision trees, neural networks,  hidden Markov models, Bayesian estimation, and reinforcement Learning. */}
              </Paragraph>
            </div>
            <div>
              <p className="sub-title">Marking Criteria</p>
              <Table 
                className="course-marking-criteria-table"
                columns={CourseMarkingCriteriaData.columns}
                // dataSource={CourseMarkingCriteriaData.dataSource}
                dataSource={coursePageData.markingItem}
                pagination={false}
              />
            </div>
            <div>
              <p className="sub-title">Syllabus</p>
              <p className="indent-paragraph">
                <a href="">Click here for the course syllabus</a>
              </p>
            </div>
          </div>
          <div className="course-page-comment">
            <p className="sub-title">Comments</p>
            <div className="course-rate">
              <Rate 
                allowHalf
                disabled
                defaultValue={3.5} 
              />
              <span>课程评分：3.5 / 5</span>
            </div>
            <List 
              className="course-comment-list"
              itemLayout="horizontal"
              dataSource={CourseCommentData}
              renderItem={(item) => {
                return (
                <li>
                  <Comment 
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    // children={item.children}
                    content={item.content}
                    datetime={item.datetime}
                  />
                </li>
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}