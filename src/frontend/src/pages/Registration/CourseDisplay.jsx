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

      // console.log(`searchCourse formData = ${formData.get("studentID")}`);

      let returnJSON = await( SearchCourse(formData) );

      setCourseData( returnJSON );

      // console.log(`!!! return JSON = ${ JSON.stringify(returnJSON) }`);

      let sortedArray = returnJSON.sort((a,b) => {
        // console.log(`a = ${ JSON.stringify(a) } and b = ${ JSON.stringify(b) }`);
        // console.log(`!!! a < b = ${ a.title < b.title }`);
        return a.title < b.title;
      });
      // console.log(`sortedArray = ${ JSON.stringify(sortedArray) }`);

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
                href: "/registration",
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
                // const data = {
                //   title: ele.fullname,
                //   coursePageLink: `/coursepage?courseTitle=${ele.title}`,
                //   credit: ele.credit,
                //   mode: ele.mode,
                // };
                const courseInfoCardDataObj = ele;
                courseInfoCardDataObj.coursePageLink = `/coursepage?courseTitle=${ele.title}`;
              
                // console.log(`!!! courseInfocardDataObj = ${ JSON.stringify(courseInfoCardDataObj) }`);
                return <CourseInfoCard key={index} data={courseInfoCardDataObj} />;
              })
            }
          </div>
        </div>
      </div>
    </Spin>
  );
}