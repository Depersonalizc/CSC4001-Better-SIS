import React from 'react';

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
  ComingTimeSlotList,
  CourseMarkingCriteriaData
} from '../data.d';
import WeeklySchedule from '../GeneralComponents/WeeklySchedule';



export default (props) => {
  const [ isModalVisible, setIsModalVisible ] = React.useState(false);
  const [ comingTutorial, setComingTutorial ] = React.useState([]);
  const [ showComingTutorial, setShowComingTutorial ] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    props.setKeepShowingComingCourses(true);
  };
  const handleModalOK = () => {
    setIsModalVisible(false);
    props.setKeepShowingComingCourses(false);
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
    props.setKeepShowingComingCourses(false);
  };

  const handleModalAddSessionMouseOver = () => {
    setComingTutorial([props.data]);
    console.log(`props.data = ${JSON.stringify(props.data)}`);
    console.log(`set coming tutorial`);
    setShowComingTutorial(true);
  };
  const handleModalAddSessionMouseLeave = () => {
    setComingTutorial([]);
    console.log(`release coming tutorial`);
    setShowComingTutorial(false);
  };

  const handleAddToCartMouseOver = () => {
    props.setShowComingCourses(true);
    const comingLectureObj = props.data;
    comingLectureObj.courseTitle = "CSC4001";
    console.log(`comingLectureObj = ${ JSON.stringify(comingLectureObj) }`);
    props.setComingLecture([comingLectureObj]);
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
      render: (text) => {
        return (
          <Button
            type="primary"
            onMouseMove={handleModalAddSessionMouseOver}
            onMouseLeave={handleModalAddSessionMouseLeave}
          >
            {text}
          </Button>
        )
      }
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
          <div style={{transform: "scale(0.55)", transformOrigin: "60% 0%",}}>
            <WeeklySchedule 
              existsCourseList={CourseTimeSlotList}
              comingCourseList={ComingTimeSlotList}
              showComingCourses={props.showComingCourses}
              showComingTutorial={showComingTutorial}
              // comingTutorialList={TutorialTimeSlot}
              comingTutorialList={comingTutorial}
            />
          </div>
          <Table 
            header={<div>CSC4001 Tutorials</div>}
            className="course-page-modal-table"
            // columns={CourseTutorialListData.columns}
            columns={TutorialTableColumns}
            // dataSource={CourseTutorialListData.dataSource}
            dataSource={props.sessionList.map((ele, index) => {
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
                addSession: "Add Session",
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
            time: "Class Time Slot",
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