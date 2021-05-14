import React from 'react';

import { PropertySafetyFilled } from '@ant-design/icons';
import { Descriptions, Badge, Button } from 'antd';

/* 引入通用函数 */
import { instructorNameToPageURL } from '../../utils/GeneralFunctions';


export default function CourseInfoCard(props) {
  const [ lectureNum, setLectureNum ] = React.useState(0);
  const [ tutorialNum, setTutorialNum ] = React.useState(0);
  const [ instructorList, setInstructorList ] = React.useState([]); 
  
  React.useEffect(() => {
    let tempInstructorList = [];
    Array.isArray(props.data.session) && props.data.session.forEach((ele) => {
      if ( ele.isLecture === true ) {
        setLectureNum((value) => value + 1);
      } else {
        setTutorialNum((value) => value + 1);
      }
      
      if ( tempInstructorList.indexOf(ele.instructor) === -1 ) {
        tempInstructorList.push(ele.instructor);
      }
    });
    setInstructorList(tempInstructorList);
  }, []);

  return (
    <div className="course-info-card">
      <div>
        <p className="main-title text-highlight">
          <a href={props.data.coursePageLink}>{props.data.fullname}</a>
        </p>
        <Button
          type="primary"
        >
          Add to Auto-Schedule Wish List
        </Button>
      </div>
      <Descriptions bordered column={3} style={{width: "80%",}}>
        <Descriptions.Item label="Sessions" span={1}>
          <span>{lectureNum} Lectures</span>
          <br />
          <span>{tutorialNum} Tutorials</span>
        </Descriptions.Item>
        <Descriptions.Item label="状态">
          <Badge status="success" text="有余位" />
        </Descriptions.Item>
        <Descriptions.Item label="学分">
          {props.data.credit}
        </Descriptions.Item>
        <Descriptions.Item label="课程时间" span={1} className="course-info-card-classtime">
          <div>
            <div className="course-time-indent-format">
              <span>Thursday </span>
              <span>14:30-15:50PM</span> 
            </div>
            <div className="course-time-indent-format">
              <span>Friday </span>
              <span>14:00-15:20PM</span>
            </div>
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="授课教师">
          {/* <a>Jane You</a> */}
          {
            (instructorList.length > 0)? instructorList.map((ele, index) => {
              return (
                <div>
                  <a 
                    key={index}
                    onClick={() => {
                      if ( instructorNameToPageURL(ele) ) {
                        window.location.href = instructorNameToPageURL(ele);
                      } else {
                        alert(`Sorry, we don't have the page for this professor ${ele}`);
                      }
                    }}  
                  >
                    {ele}
                  </a>
                </div>
              )
            })
            :
            <div>null</div>
          }
        </Descriptions.Item>
        <Descriptions.Item label="授课方式">{props.data.mode}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}