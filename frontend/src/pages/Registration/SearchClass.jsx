import React, { useState, useEffect } from 'react';
import "./index.less";

/* 引入组件 */
import NavigatorWithTime from '../GeneralComponents/NavigatorWithTime';
import RegistrationMenu from './Menu';
import Breadcrumb from '../GeneralComponents/Breadcrumb';
import WeeklySchedule from '../GeneralComponents/WeeklySchedule';


/* 引入数据 */
import { RegistrationTermData } from '../data.d';
import { 
  SearchCoursePrefixData, 
  SearchCourseSchoolData,
  SearchCourseTargetStudentData } from '../data.d';
import { 
  CourseTimeSlotList, 
  ComingTimeSlotList,
  CourseMarkingCriteriaData
} from '../data.d';

/* 引入图片 */

import { Menu, Button, Dropdown, Steps, Divider, Table, Input } from 'antd';
const { SubMenu } = Menu;
const { Step } = Steps;

import { Select } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
const { Option } = Select;


export default function SearchClass(props) {
  return (
    <div className="course-registration">
      <NavigatorWithTime />
      {/* <RegistrationMenu /> */}
      <div className="course-registration-body">
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
              href: null,
              icon: null,
              text: "选择课程",
            },
          ]}
        />
        <div className="registration-progress" style={{width: "70%",}}>
          <p className="block-title">选课流程须知</p>
          <Steps current={1}>
            <Step title="选择学期" description="This is a description." />
            <Step title="选择课程" description="This is a description." />
            <Step title="到点抢课" description="This is a description." />
            <Step title="确定课程" description="This is a description." />
          </Steps>
        </div>
        <Divider />
        <div className="course-registration-search-class">
          <div>
            <div className="course-registration-select-class">
              <p className="block-title">{"当前步骤：选择课程 > 查询课程"}</p>
              <MySelector content={SearchCoursePrefixData} />
              <div className="course-registration-selector">
                <span>
                  课程编号
                </span>
                <Input placeholder="课程编号"/>
              </div>
              <MySelector content={SearchCourseSchoolData} />
              <MySelector content={SearchCourseTargetStudentData} />
              <div className="next-step-button-div">
                <Button 
                  type="primary"
                  className="next-step-button"
                >
                  <a href="/registration/courseDisplay">查询课程</a>
                </Button>
              </div>
            </div>
          </div>
          <div>
            <p className="sub-title">Your Current Weekly Schedule</p>
            <div style={{transform: "scale(0.65)", transformOrigin: "10% 20%",}}>
              <WeeklySchedule 
                existsCourseList={CourseTimeSlotList}
                comingCourseList={ComingTimeSlotList}
                // showComingCourses={showComingCourses}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




function MySelector(props) {
  return (
    <div className="course-registration-selector">
      <span>
        {props.content.title}
      </span>
      <Select
        className="course-registration-selector-body"
        showSearch
        // style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }
      >
        {
          props.content.data.map((ele, index) => {
            return (
              <Option value={`${index+1}`}>{ele}</Option>
            )
          })
        }
      </Select>
    </div>
  )
}