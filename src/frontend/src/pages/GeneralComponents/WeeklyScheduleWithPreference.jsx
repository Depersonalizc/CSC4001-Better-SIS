import React, { useState, useEffect } from 'react';

import { List, Popover, Button, Checkbox, Divider } from 'antd';

/* 引入组件 */
import WeeklySchedule from './WeeklySchedule';

/* 引入数据 */
import { 
  CourseTimeSlotList, 
  ComingTimeSlotList,
  AddedNotConfirmedList,
} from '../data.d';
import { WeeklySchedulePreferenceCourseList } from '../data.d';

/* 引入通用及api函数 */
import { 
  setPreference,
} from '../api/api';
import { 
  getCookie,
 } from '../../utils/GeneralFunctions';


export default function WeeklyScheduleWithPreference(props) {
  return (
    <div className="weekly-schedule-with-preference">
      <div>
        <WeeklySchedule 
          existsCourseList={CourseTimeSlotList}
          comingCourseList={ComingTimeSlotList}
          showComingCourses={true}
          timeSlots={{
            confirmed: {
              show: true,
              data: CourseTimeSlotList,
              // data: props.weeklyScheduleData? (props.weeklyScheduleData.confirmed? props.weeklyScheduleData.confirmed : CourseTimeSlotList) : CourseTimeSlotList,
              // data: props.weeklyScheduleData.confirmed? props.weeklyScheduleData.confirmed : CourseTimeSlotList,
            },
            // addedNotConfirmed: {
            //   show: true,
            //   data: AddedNotConfirmedList,
            // },
            // ComingTimeSlotList: {
            //   show: true,
            //   data: comingCourseList,
            // },
            comingLectures: {
              show: false,
              data: [],
            },
            comingTutorials: {
              show: false,
              data: [],
            },
          }}
        />
      </div>
      <div>
        <WeeklySchedulePreference 
          data={props.preferenceData}
        />
      </div>
    </div>
  )
}



/* 
 * props:
 * -----------------
 * data format of a preference
 *  {
      "noMorning": "False",
      "noNoon": "False",
      "noFriday": "True",
      "wishlist": [
          "CSC1001"
      ]
    }
 */
export function WeeklySchedulePreference(props) {
  const maxWishlistCourseNumber = 6;
  const [ wishlistCourses, setWishlistCourses ] = React.useState(() => {
    let myWishlist = props.data;
    if ( Array.isArray(myWishlist) ) {
      while( myWishlist.length < maxWishlistCourseNumber ) {
        myWishlist.push("");
      }
      console.log(`my wishlist = ${ myWishlist }`);
      return myWishlist;
    }
    else {
      return [];
    }
  });

  const [ noFriday, setNoFriday ] = React.useState(false);
  const [ noMorning, setNoMorning ] = React.useState(false);
  const [ noNoon, setNoNoon ] = React.useState(false);


  const removeCourseFromWishlist = () => {
    alert("remove course ");
  };

  const handleAutoScheduleButtonClick = async () => {
    console.log(`no friday: ${ noFriday }`);
    console.log(`no morning: ${ noMorning }`);
    console.log(`no noon: ${ noNoon }`);

    // 获取学生ID cookie数据
    let studentID = getCookie("studentID");

    if ( !studentID ) {
      throw new Error(`studentID is null`);
    }

    // 先设置preference
    let preferenceFormData = new FormData();
    preferenceFormData.append("noFriday", noFriday);
    preferenceFormData.append("noMorning", noMorning);
    preferenceFormData.append("noNoon", noNoon);
    preferenceFormData.append("studentID", studentID);

    let preferenceReturnJSON = await( setPreference(preferenceFormData) );
    if ( preferenceReturnJSON.seted ) {
      console.log(`success in setting preference`);
    }

    // auto add
    
  };

  const content = (
    <div>
      <p>{"L01--周一/周三：10:30-11.50AM"}</p>
      <p>{"T01--周二：6:00-6:50PM"}</p>
      <p>{"T02--周二：7:00-7:50PM"}</p>
    </div>
  );

  const CourseListToAdd = [
    "CSC1001",
    "CSC1002",
    "CSC3002",
    "CSC3100",
    "CSC3050",
    "EIE2050",
  ];

  const dayPereference = [
    // "不要周一",
    // "不要周二",
    // "不要周三",
    // "不要周四",
    "不要周五",
    // "不要周末",
  ];

  const morningClassPreference = [
    // "不要早课(8:30AM)",
    // "不要早课(10:30AM)",
    // "不要午课(13:30PM)",
    "不要早课",
    "不要午课",
  ];

  return (
    <div className="weekly-schedule-preference">
      <div>
        <div className="vertical-gradient-divider"></div>
      </div>
      <div>
        <div className="weekly-schedule-preference-courses">
          {/* <p>自动排课待添加课程</p> */}
          {/* <Divider className="divider" /> */}
          <List
            header={<p className="weekly-schedule-preference-title">自动排课待添加课程</p>}
            // footer={<div>Footer</div>}
            style={{
              // border: "1px solid red",
              height: "45rem",
            }}
            size="small"
            split={false}
            // bordered
            // dataSource={CourseListToAdd}
            dataSource={props.data? props.data.wishlist : []}
            renderItem={item => (
              <List.Item style={{height: "5rem", }}>
                <span>{item}</span>
                <Button 
                  type="link"
                  href={`/coursepage?courseTitle=${item}`}  
                  target="_blank"
                >
                  课程页面
                </Button>
                <Button
                  type="link"
                  onClick={removeCourseFromWishlist}
                >
                  移除课程
                </Button>
                {/* <span>
                  <Popover 
                    content={content} 
                    title="课程名" 
                    trigger="hover"
                    placement="top"  
                  >
                    <Button type="link">课程详情</Button>
                  </Popover>
                </span> */}
                {/* <span></span> */}
              </List.Item>
            )}
          />
        </div>
        <Divider className="divider" />
        <div>
          <p className="weekly-schedule-preference-title">时间偏好</p>
          {/* <Divider className="divider"/> */}
          <Checkbox.Group
            options={dayPereference}
            className="checkbox-group"
            onChange={(checkedValue) => {
              setNoFriday( checkedValue.indexOf("不要周五") === -1? false : true );
            }}
            // disabled
            // defaultValue={['Apple']}
            // onChange={onChange}
          />
        </div>
        <Divider className="divider" />
        <div>
          <p className="weekly-schedule-preference-title">早/午课偏好</p>
          <Checkbox.Group
            options={morningClassPreference}
            className="checkbox-group"
            onChange={(checkedValue) => {
              console.log(`checked value = ${ JSON.stringify(checkedValue) }`);
              setNoMorning( checkedValue.indexOf("不要早课") === -1? false : true );
              setNoNoon( checkedValue.indexOf("不要午课") === -1? false : true );
            }}
          />
        </div>
        {/* <Divider className="divider" /> */}
        <div>
          <Button 
            type="primary" 
            shape="round" 
            className="weekly-schedule-with-preference-button"
            onClick={handleAutoScheduleButtonClick}  
          >一键自动排课</Button>
        </div>
      </div>
    </div>
  );
}