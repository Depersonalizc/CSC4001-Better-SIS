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
              // data: CourseTimeSlotList,
              data: props.weeklyScheduleData.confirmed? props.weeklyScheduleData.confirmed : CourseTimeSlotList,
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
        <WeeklySchedulePreference />
      </div>
    </div>
  )
}



export function WeeklySchedulePreference(props) {
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
    "不要周一",
    "不要周二",
    "不要周三",
    "不要周四",
    "不要周五",
    "不要周末",
  ];

  const morningClassPreference = [
    "不要早课(8:30AM)",
    "不要早课(10:30AM)",
    "不要午课(13:30PM)",
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
            size="small"
            split={false}
            // bordered
            // dataSource={WeeklySchedulePreferenceCourseList}
            dataSource={CourseListToAdd}
            renderItem={item => (
              <List.Item style={{height: "5rem",}}>
                <span>{item}</span>
                <span>
                  <Popover 
                    content={content} 
                    title="课程名" 
                    trigger="hover"
                    placement="top"  
                  >
                    <Button type="link">课程详情</Button>
                  </Popover>
                </span>
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
          />
        </div>
        {/* <Divider className="divider" /> */}
        <div>
          <Button type="primary" shape="round" className="weekly-schedule-with-preference-button">一键自动排课</Button>
        </div>
      </div>
    </div>
  );
}