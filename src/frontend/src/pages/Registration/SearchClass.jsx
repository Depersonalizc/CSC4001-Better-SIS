import React, { useState, useEffect } from 'react';
import "./index.less";

/* 引入api函数 */
import { SearchCourse } from '../api/api';

/* 引入组件 */
import NavigatorWithTime from '../GeneralComponents/NavigatorWithTime';
import RegistrationMenu from './Menu';
import Breadcrumb from '../GeneralComponents/Breadcrumb';
import WeeklySchedule from '../GeneralComponents/WeeklySchedule';


/* 引入数据 */
// import { RegistrationTermData } from '../data.d';
// import { 
//   SearchCoursePrefixData, 
//   SearchCourseSchoolData,
//   SearchCourseTargetStudentData } from '../data.d';
import { SearchData } from '../data.d';
import { 
  CourseTimeSlotList, 
  ComingTimeSlotList,
  // CourseMarkingCriteriaData
} from '../data.d';

/* 引入图片 */

import { 
  Menu, 
  Button, 
  Dropdown, 
  Steps, 
  Divider, 
  Table, 
  Input, 
  Spin,
} from 'antd';
const { SubMenu } = Menu;
const { Step } = Steps;

import { Select } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
const { Option } = Select;


export default function SearchClass(props) {
  const [ isSpinning, setIsSpinning ] = React.useState(true);
  const [ coursePrefix, setCoursePrefix ] = React.useState("");
  const [ courseCode, setCourseCode ] = React.useState("");
  const [ courseSchool, setCourseSchool ] = React.useState("");
  const [ courseTargetStudent, setCourseTargetStudent ] = React.useState("");

  const handleCoursePrefixChnage = (value) => {
    setCoursePrefix(value);
  };
  const handleCourseCodeChange = (event) => {
    setCourseCode(event.target.value);
  };
  const handleCourseSchoolChange = (value) => {
    setCourseSchool(value);
  };
  const handleCourseTargetStudentChange = (value) => {
    setCourseTargetStudent(value);
  };

  const handleSearchCourseButtonClick = async () => {
    console.log(`course prefix = ${coursePrefix}`);
    console.log(`course code = ${courseCode}`);
    console.log(`course school = ${courseSchool}`);
    console.log(`course target student = ${courseTargetStudent}`);

    // let formData = new FormData();
    // formData.append("coursePrefix", coursePrefix);
    // formData.append("courseCode", null);
    // formData.append("school", null);
    // formData.append("targetStudent", null);

    // let returnJSON = await( SearchCourse(formData) );

    window.location.href=`/registration/courseDisplay?coursePrefix=${coursePrefix}&courseCode=${courseCode}&school=${courseSchool}&targetStudent=${courseTargetStudent}`;
  };

  return (
    <Spin spinning={isSpinning}>
      <div className="course-registration">
        <NavigatorWithTime setIsSpinning={setIsSpinning} />
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
                href: "/registration",
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
            <p className="sub-title">选课流程须知</p>
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
                <p className="sub-title" style={{marginBottom: "8rem",}}>{"当前步骤：选择课程 > 查询课程"}</p>
                <MySelector content={SearchData.coursePrefix} onChangeFunc={handleCoursePrefixChnage} />
                <div className="course-registration-selector">
                  <span className="small-title">
                    课程编号
                  </span>
                  <Input className="course-registration-selector-body" placeholder="课程编号" onChange={handleCourseCodeChange} />
                </div>
                <MySelector content={SearchData.courseSchool} onChangeFunc={handleCourseSchoolChange} />
                <MySelector content={SearchData.courseTargetStudent} onChangeFunc={handleCourseTargetStudentChange} />
                <div className="next-step-button-div">
                  <Button 
                    type="primary"
                    className="next-step-button"
                    onClick={handleSearchCourseButtonClick}
                  >
                    查询课程
                    {/* <a href="/registration/courseDisplay">查询课程</a> */}
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
                  timeSlots={{
                    confirmed: {
                      show: true,
                      data: CourseTimeSlotList,
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}




function MySelector(props) {
  return (
    <div className="course-registration-selector">
      <span className="small-title">
        {props.content.title}
      </span>
      <Select
        className="course-registration-selector-body"
        showSearch
        // style={{ width: 200 }}
        placeholder="Search to Select"
        onChange={props.onChangeFunc}
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
              <Option value={`${ele}`}>{ele}</Option>
            )
          })
        }
      </Select>
    </div>
  )
}