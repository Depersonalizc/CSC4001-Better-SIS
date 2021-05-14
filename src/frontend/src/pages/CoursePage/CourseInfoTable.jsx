import React from 'react';

import {
  addClass,
} from '../api/api';

import {
  Button,
  Table,
  Badge,
  Modal,
} from 'antd';

import { 
  // CoursePageInfoData,
  CourseTutorialListData,
} from '../data.d';

import { 
  CourseTimeSlotList, 
  AddedNotConfirmedList,
  ComingTimeSlotList,
  CourseMarkingCriteriaData
} from '../data.d';
import WeeklySchedule from '../GeneralComponents/WeeklySchedule';
import { 
  getCookie,
  instructorNameToPageURL, 
} from '../../utils/GeneralFunctions';



export default (props) => {
  const [ isModalVisible, setIsModalVisible ] = React.useState(false);
  const [ comingTutorial, setComingTutorial ] = React.useState([]);
  const [ showComingTutorial, setShowComingTutorial ] = React.useState(false);
  const [ isAddSessionButtonLoading, setIsAddSessionButtonLoading ] = React.useState(false);

  // const instructorNameToPageURL = (instructor) => {
  //   switch(instructor) {
  //     case "Han Xiaoguang":
  //       return "https://mypage.cuhk.edu.cn/academics/hanxiaoguang/";
  //     case "Zhao Junhua":
  //       return "https://www.zhaojunhua.org/";
  //     case "Cai Wei":
  //       return "https://mypage.cuhk.edu.cn/academics/caiwei/";
  //     default:
  //       // return "https://sse.cuhk.edu.cn/teacher-search?keywords=&alphabet=All&category=All&academic=All&class_type=All&page=3";
  //       return null;
  //   }
  // };


  const addClassToCart = async () => {
    // 按钮进入loading状态
    setIsAddSessionButtonLoading(true);
    
    let studentID = getCookie("studentID");
    let sessionNo = [];
    console.log(`!!! comingLecture = ${ JSON.stringify( props.comingLecture ) }`);
    for ( let i = 0; i < props.comingLecture.length; ++i ) {
      if ( sessionNo.indexOf(props.comingLecture[i].sessionNumber) == -1 ) {
        sessionNo.push( props.comingLecture[i].sessionNumber );
      }
    }
    for ( let i = 0; i < comingTutorial.length; ++i ) {
      if ( sessionNo.indexOf(comingTutorial[i].sessionNumber) == -1 ) {
        sessionNo.push( comingTutorial[i].sessionNumber );
      }
    }
    
    let inputObj = {
      studentID: studentID,
      sessionNo: sessionNo,
    };
    console.log(`!!! inputObj = ${ JSON.stringify(inputObj) }`);

    let returnJSON = await( addClass(inputObj) );
    console.log(`!!! addClass: return JSON = ${ JSON.stringify(returnJSON) }`);

    if ( returnJSON.added === true ) {
      // 按钮接触loading状态
      setIsAddSessionButtonLoading(false);
      alert("You have added this course successfully!");
      window.location.href = "";
    } else {
      alert("Sorry, there was something wrong and you failed to add this course.");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    props.setKeepShowingComingCourses(true);
  };
  const handleModalOK = () => {
    setIsModalVisible(false);
    // addClassToCart();
    props.setKeepShowingComingCourses(false);
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
    props.setKeepShowingComingCourses(false);
  };

  function handleModalAddSessionMouseOver() {
    console.log(`this = ${ JSON.stringify(this) }`);
    setComingTutorial( this.timeSlots.map((ele) => {
      return {
        courseTitle: this.courseTitle,
        sessionNumber: this.sessionNumber,
        isLecture: this.isLecture,
        beginTime: ele.beginTime,
        endTime: ele.endTime,
        weekday: ele.weekday,
        location: this.location,
      };
    }) );
    // console.log(`props.data = ${JSON.stringify(props.data)}`);
    console.log(`set coming tutorial`);
    setShowComingTutorial(true);
  };
  function handleModalAddSessionMouseLeave() {
    setComingTutorial([]);
    console.log(`release coming tutorial`);
    setShowComingTutorial(false);
  };

  const handleAddToCartMouseOver = () => {
    props.setShowComingCourses(true);
    const comingLectureSession = props.data;
    let comingLecturList = comingLectureSession.timeSlots.map((ele, index) => {
      return {
        courseTitle: comingLectureSession.courseTitle,
        sessionNumber: comingLectureSession.sessionNumber,
        isLecture: comingLectureSession.isLecture,
        beginTime: ele.beginTime,
        endTime: ele.endTime,
        weekday: ele.weekday,
        location: comingLectureSession.location,
      };
    });
    // console.log(`comingLectureObj = ${ JSON.stringify(comingLectureObj) }`);
    props.setComingLecture(comingLecturList);
  };
  const handleAddToCartMouseLeave = () => {
    !props.keepShowingComingCourses && props.setShowComingCourses(false);
    !props.keepShowingComingCourses && props.setComingLecture([]);
  };

  const TutorialTableColumns = [
		{
			title: "Session",
			dataIndex: "session",
		}, {
			title: "Time",
			dataIndex: "time",
		}, {
			title: "Instructor",
			dataIndex: "instructor",
		}, {
			title: (
				<div>
					<span>Status: </span>
					{/* <br />
					<span>Quota: </span> */}
				</div>
			),
			dataIndex: "status",
		}, {
			title: "Classroom",
			dataIndex: "classroom",
		}, {
			title: "Add Session",
			dataIndex: "addSession",
      // render: (text) => {
      //   return (
      //     <Button
      //       type="primary"
      //       onMouseMove={handleModalAddSessionMouseOver}
      //       onMouseLeave={handleModalAddSessionMouseLeave}
      //     >
      //       {text}
      //     </Button>
      //   )
      // }
		},
	];

  const CourseInfoTableColumns = [
    {
      title: "Time",
      dataIndex: "time",
    }, {
      title: "Room",
      dataIndex: "room",
    }, {
      title: "Instructor",
      dataIndex: "instructor",
      render: (instructor) => {
        return (
          <a 
            // href={instructorNameToPageURL(instructor)} 
            target="_blank" rel="noreferrer"
            onClick={() => {
              if ( instructorNameToPageURL(instructor) ) {
                window.location.href = instructorNameToPageURL(instructor);
              } else {
                alert(`Sorry, we don't have the page for this professor ${instructor}`);
              }
            }}
          >
            {instructor}
          </a>
        );
      },
    },
  ];

  const TutorialTimeSlot = [
    {
      courseTitle: "CSC4001",
      session: 1,
      isLecture: false,
      beginTime: "19:00",
      endTime: "19:50",
      weekday: "Monday",
      location: "TA310",
    },
  ];

  // console.log(`props.data = ${ JSON.stringify(props.data) }`);
  return (
    <div className="course-description-table">
      <div>
        <div className="course-description-table-cell">
          <span className="course-description-table-cell-title small-title">
            Section: 
          </span>
          <span>
            {props.data.isLecture? "Lecture" : "Tutorial"}
            {"-"}
            {props.data.sessionNumber.toString().length === 1? "0" + props.data.sessionNumber.toString() : props.data.sessionNumber.toString()}
          </span>
        </div>
        <div className="course-description-table-cell">
          <span 
            className="course-description-table-cell-title small-title"
            style={{minWidth: "23rem",}}  
          >
            Current Enrollment: 
          </span>
          <span>{props.data.currentEnrollment}</span>
        </div>
        <br />
        <div className="course-description-table-cell">
          <span 
            className="course-description-table-cell-title small-title"
          >
            Status: 
          </span>
          <Badge 
            status={props.data.currentEnrollment < props.data.classCapacity? "success" : "error"} 
            text={props.data.currentEnrollment < props.data.classCapacity? "Available" : "Full"} 
          />
        </div>
        <div className="course-description-table-cell">
          <span 
            className="course-description-table-cell-title small-title"
            style={{minWidth: "23rem",}}  
          >
            Class Capacity: 
          </span>
          <span>{props.data.classCapacity}</span>
        </div>

        {/* <div className="course-description-table-status">
          <Badge status="success" text="Available" />
        </div> */}
        <div className="course-description-table-button">
          <Button 
            type="primary" 
            onClick={ showModal }
            onMouseOver={handleAddToCartMouseOver}
            onMouseLeave={handleAddToCartMouseLeave}
            disabled={props.data.conflict}
          >Add to Cart</Button>
        </div>
        <Modal 
          title="Choose a tutorial session for CSC4001" 
          className="course-page-modal"
          width={"160rem"}
          // mask={false}
          visible={isModalVisible} 
          onOk={handleModalOK} 
          onCancel={handleModalCancel}
        >
          <p className="sub-title">Your Weekly Schedule</p>
          <div style={{transform: "scale(0.55)", transformOrigin: "80% 0%", textAlign: "center", width: "120rem",}}>
            <WeeklySchedule 
              existsCourseList={CourseTimeSlotList}
              // comingCourseList={ComingTimeSlotList}
              comingCourseList={props.comingLecture}
              showComingCourses={props.showComingCourses}
              showComingTutorial={showComingTutorial}
              // comingTutorialList={TutorialTimeSlot}
              comingTutorialList={comingTutorial}
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
                  show: props.showComingCourses,
                  data: props.comingLecture,
                },
                comingTutorials: {
                  show: showComingTutorial,
                  data: comingTutorial,
                },
              }}
            />
          </div>
          <Table 
            header={<div>CSC4001 Tutorials</div>}
            className="course-page-modal-table"
            // columns={CourseTutorialListData.columns}
            columns={TutorialTableColumns}
            // dataSource={CourseTutorialListData.dataSource}
            dataSource={props.sessionList.filter((ele) => ele.isLecture === false).map((ele, index) => {
              return {
                key: index,
                session: (ele.isLecture? "Lecture" : "Tutorial") + "-" + (ele.sessionNumber.toString().length === 1? "0" + ele.sessionNumber.toString() : ele.sessionNumber.toString()),
                time: (
                  <div className="course-time-indent-format">
                    <span>{ele.weekday} </span>
                    <span>{ele.beginTime} - {ele.endTime}</span>
                  </div>
                ),
                instructor: ele.instructor,
                status: (
                  <Badge 
                    status={ele.currentEnrollment < ele.classCapacity? "success" : "error"}
                    text={ele.currentEnrollment < ele.classCapacity? "Available" : "Full"}
                  />
                ),
                classroom: ele.location,
                addSession: (
                  <Button
                    type="primary"
                    onMouseMove={handleModalAddSessionMouseOver.bind(ele)}
                    onMouseLeave={handleModalAddSessionMouseLeave.bind(ele)}
                    onClick={addClassToCart}
                    loading={isAddSessionButtonLoading}
                  >
                    {"Add Session"}
                  </Button>
                ),
              };
            })}
            pagination={false}
          />
        </Modal>
      </div>
      <div>
        <Table 
          className="course-description-info-table"
          // columns={CoursePageInfoData.columns}
          // dataSource={CoursePageInfoData.dataSource}
          columns={CourseInfoTableColumns}
          dataSource={[{
            time: props.data.timeSlots.map((ele, index) => {
              return (
                <div className="course-time-indent-format" key={index}>
                  <span>{ele.weekday} </span>
                  <span>{ele.beginTime} - {ele.endTime}</span>
                </div>
              );
            }),
            room: props.data.location,
            instructor: props.data.instructor,
          }]}
          pagination={false}
          size="small"
        />
      </div>
    </div>
  )
}