import React, { useState, useEffect } from 'react';

/* 引入通用及api函数 */
import { SearchCourse } from '../api/api';
import { 
  getURLParameter, 
  getCookie,
} from '../../utils/GeneralFunctions';

/* 引入组件 */
import NavigatorWithTime from '../GeneralComponents/NavigatorWithTime';
import RegistrationMenu from './Menu';
import Breadcrumb from '../GeneralComponents/Breadcrumb';
import CourseInfoCard from './CourseInfoCard';

/* 引入数据 */
// import { CourseData } from '../data.d';
import {
  Spin,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';


export default function CourseDisplay(props) {
  const [ isSpinning, setIsSpinning ] = React.useState(true);
  const [ CourseData, setCourseData ] = React.useState([]);

  React.useEffect( () => {
    const fetchCourseData = async () => {
      let currentURL = window.location.href;
      let studentID = getCookie("studentID");
      let coursePrefix = getURLParameter(currentURL, "coursePrefix");
      let courseCode = getURLParameter(currentURL, "courseCode");
      let school = getURLParameter(currentURL, "school");
      let targetStudent = getURLParameter(currentURL, "targetStudent");

      console.log(`courseCode = ${courseCode} with type = ${typeof courseCode}`);

      let formData = new FormData();
      formData.append("studentID", studentID);
      formData.append("coursePrefix", coursePrefix);
      formData.append("courseCode", courseCode);
      formData.append("school", school);
      formData.append("targetStudent", targetStudent);

      let returnJSON = await( SearchCourse(formData) );
      setCourseData( returnJSON );

      setIsSpinning(false);
    };

    fetchCourseData();
  }, [] );

  return (
    <Spin spinning={isSpinning}>
      <div className="course-registration">
        <NavigatorWithTime setIsSpinning={null} />
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
                text: "查询结果",
              },
            ]}
          />
          <div>
            {
              CourseData.map((ele, index) => {
                const data = {
                  title: ele.fullname,
                  coursePageLink: `/coursepage?courseTitle=${ele.title}`,
                  credit: ele.credit,
                  mode: ele.mode,
                };
                return <CourseInfoCard key={index} data={data} />;
              })
            }
          </div>
        </div>
      </div>
    </Spin>
  );
}