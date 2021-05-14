import React from 'react';

/* 引入样式 */
import './index.less';

/* 引入通用和api函数 */
import { getCookie, getURLParameter } from '../../utils/GeneralFunctions';
import { 
  SearchCourse,
  canBufferSession,
} from '../api/api';

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
  Spin,
} from 'antd';
const { Text, Paragraph } = Typography;
import { 
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons';


/* 引入数据 */
import { 
  CourseTimeSlotList, 
  AddedNotConfirmedList,
  ComingTimeSlotList,
  // CourseMarkingCriteriaData,
  CourseData,
} from '../data.d';
import { CourseCommentData } from '../data.d';
import { useState } from 'react';
import { HomeOutlined } from '@material-ui/icons';



export default function CoursePage(props) {
  const [ isSpinning, setIsSpinning ] = React.useState(true);
  const [ showComingCourses, setShowComingCourses ] = React.useState(false);
  const [ comingLecture, setComingLecture ] = React.useState([]);
  const [ keepShowingComingCourses, setKeepShowingComingCourses ] = React.useState(false);
  const [ coursePageData, setCoursePageData ] = React.useState(() => { 
    return null;
    // let paramString = window.location.search.slice(1);
    // console.log(`paramString = ${paramString}`);
    // let targetIndex = paramString.indexOf("courseTitle");
    // let value = "";
    // if ( targetIndex !== -1 ) {
    //   for ( let i = targetIndex; i < paramString.length; ++i ) {
    //     if ( paramString[i] === '&' || paramString[i] === '/' ) {
    //       break;
    //     } else {
    //       value += paramString[i];
    //     }
    //   }
    //   console.log(`value = ${value}`);
    // }
    // if ( value.indexOf('=') !== -1 ) {
    //   value = value.split('=')[1];
    //   console.log(`final value = ${value}`);

    //   // get the data
    //   for (let i = 0; i < CourseData.length; ++i) {
    //     if ( CourseData[i].title === value ) {
    //       return CourseData[i];
    //     }
    //   }
    //   throw new Error(`Error in course page courseTitle retrieval: no such ${value} in CourseData`);
    // } else {
    //   throw new Error(`Error in course page courseTitle retrieval: no '=' in value`);
    // }
  });

  React.useEffect(() => {
    const fetchCourseData = async () => {
      let currentURL = window.location.href;
      let courseTitle = decodeURI( getURLParameter(currentURL, "courseTitle") );
      console.log(`decoded courseTitle = ${ courseTitle }`);
      let coursePrefix = courseTitle.replace(/[^a-zA-Z]/g, '');
      let courseCode= courseTitle.replace(/[^0-9]/ig,"");
      console.log(`coursePrefix = ${coursePrefix}`);
      console.log(`courseCode = ${courseCode}`);

      let studentID = getCookie("studentID");

      let formData = new FormData();
      formData.append("studentID", studentID);
      formData.append("coursePrefix", coursePrefix);
      formData.append("courseCode", courseCode);
      formData.append("school", "");
      formData.append("targetStudent", "");

      let returnJSON = await( SearchCourse(formData) );
      console.log(`coursePageData = ${ JSON.stringify(returnJSON[0]) }`);
      setCoursePageData( returnJSON[0] );


      // check if the sessions are conflict or not
      let canBufferSessionObj = {};
      canBufferSessionObj.studentID = studentID;
      canBufferSessionObj.courseCodes = [ returnJSON[0].title ],
      canBufferSessionObj.sessionNo = returnJSON[0].session.map((ele) => ele.sessionNumber);
      console.log(`canBufferSessionObj = ${ JSON.stringify(canBufferSessionObj) }`);

      let canBufferSessionReturnJSON = await( canBufferSession(canBufferSessionObj) );
      let ableList = canBufferSessionReturnJSON["able"];
      console.log(`able list = ${ JSON.stringify(ableList) } with type = ${ Object.prototype.toString.call(ableList) }`);

      for ( let sessionNo in ableList ) {
        for (let i = 0; i < returnJSON[0].session.length; ++i) {
          console.log(`this session = ${ JSON.stringify(returnJSON[0].session[i]) }`);
          console.log(`sessionNo = ${sessionNo} with type = ${typeof sessionNo}`);
          console.log(`this session number = ${ returnJSON[0].session[i].sessionNumber } with type = ${typeof returnJSON[0].session[i].sessionNumber}`)
          if ( returnJSON[0].session[i].sessionNumber == sessionNo ) {
            console.log(`ableList[sessionNo] = ${ ableList[sessionNo] }`);
            returnJSON[0].session[i].conflict = !ableList[sessionNo];
            console.log(`set conflict = ${ !ableList[sessionNo] }`)
            break;
          }
        }
      }

      console.log(`!!! Important !!!: session list = ${ JSON.stringify(returnJSON[0].session) }`);

      setIsSpinning(false);
      console.log(`set isSpinning to false`);
    };

    fetchCourseData();
  }, []);
  

  const courseCodeToSyllabusLink = (courseTitle) => {
    switch(courseTitle) {
      case "CSC4001":
        return "https://bb.cuhk.edu.cn/bbcswebdav/pid-143870-dt-content-rid-2287111_1/courses/CSC400120201628/CSC4001syllabus.pdf";
      default: 
        return null;
    }
  };


  const CourseMarkingCriteriaColumns = [
    {
      title: "Marking Item",
      dataIndex: "item",
    }, {
      title: "Weight",
      dataIndex: "weight",
    },
  ];

  return (
    <Spin spinning={isSpinning}>
      <div className="course-page">
        <NavigatorWithTime setIsSpinning={null} />
        <div className="course-page-body margin-body">
          <Breadcrumb 
            data={[
              {
                href: "/",
                icon: <HomeOutlined className="breadcrumb-icon" />,
                text: "Home",
              },
              {
                href: "/registration",
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
                text: coursePageData && coursePageData.title,
              },
            ]}
          />
          <div>
            <div>
              <div className="course-page-prerequisite">
                <span className="small-title">Prerequisites: </span>
                <br />
                <ul>
                  {
                    coursePageData && coursePageData.prerequisite && coursePageData.prerequisite.map((ele, index) => {
                      return (
                        <li>
                          {ele}
                          {" "}
                          {coursePageData.prereqSatisfied[index]?
                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                            :
                            <CloseCircleTwoTone twoToneColor="#eb2f96" />
                          }
                        </li>
                      );
                    })
                  }
                  {/* <li>CSC1001 <CheckCircleTwoTone twoToneColor="#52c41a"/></li>
                  <li>CSC3002 <CheckCircleTwoTone twoToneColor="#52c41a"/></li>
                  <li>CSC3010 <CloseCircleTwoTone twoToneColor="#eb2f96"/></li> */}
                </ul>
              </div>
              {/* <p className="main-title">CSC4001: Software Engineering</p> */}
              <p className="main-title">{coursePageData && coursePageData.fullname}</p>
              <div>
                <p className="large-text">This is your <span className="text-highlight">Major Required</span> course.</p>
              </div>
              <p className="sub-title" style={{marginTop: "8rem",}}>Lectures</p>
              {
                coursePageData && coursePageData.session.filter((ele) => ele.isLecture === true).map((ele, index) => {
                  ele.courseTitle = coursePageData.title;
                  let sessionObjWithCourseTitle = ele;
                  sessionObjWithCourseTitle.courseTitle = coursePageData.title;
                  return (
                    <CourseInfoTable 
                      key={index}
                      data={sessionObjWithCourseTitle}
                      sessionList={coursePageData.session}
                      showComingCourses={showComingCourses}
                      setShowComingCourses={setShowComingCourses} 
                      comingLecture={comingLecture}
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
                  timeSlots={{
                    confirmed: {
                      show: true,
                      data: CourseTimeSlotList,
                    },
                    addedNotConfirmed: {
                      show: true,
                      data: AddedNotConfirmedList,
                    },
                    comingLectures: {
                      show: showComingCourses,
                      data: comingLecture,
                    },
                    comingTutorials: {
                      show: false,
                      data: [],
                    }
                  }}
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
                  {coursePageData && coursePageData.introduction}
                {/* This is a fundamental course to provide the general concepts of machine learning. This course provides you the opportunity to learn skills and content to practice and engage in scalable machine learning methods on massive data and to study methods to train/learn/develop computational models from varieties of data. It covers supervised learning, clustering, parametric and nonparametric methods, decision trees, neural networks,  hidden Markov models, Bayesian estimation, and reinforcement Learning. */}
                </Paragraph>
              </div>
              <div>
                <p className="sub-title">Marking Criteria</p>
                <Table 
                  className="course-marking-criteria-table"
                  columns={CourseMarkingCriteriaColumns}
                  // dataSource={CourseMarkingCriteriaData.dataSource}
                  dataSource={coursePageData && coursePageData.markingCriteria}
                  pagination={false}
                />
              </div>
              <div>
                <p className="sub-title">Syllabus</p>
                <p className="indent-paragraph">
                  <a
                    onClick={() => {
                      // console.log(`!!! coursePageData of syllabus = ${ JSON.stringify(coursePageData) }`);
                      // if ( courseCodeToSyllabusLink(coursePageData.title) ) {
                      //   window.location.href = courseCodeToSyllabusLink(coursePageData.title);
                      // } else {
                      //   alert(`Sorry, we don't have the course syllabus for course ${coursePageData.title}`);
                      // }
                      if ( coursePageData.syllabus ) {
                        window.location.href = coursePageData.syllabus;
                      } else {
                        alert(`Sorry, we don't have the course syllabus for course ${coursePageData.title}`);
                      }
                    }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Click here for the course syllabus
                  </a>
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
    </Spin>
  )
}