import React, { useState, useEffect } from 'react';

/* 引入组件 */
import NavigatorWithTime from '../GeneralComponents/NavigatorWithTime';
import RegistrationMenu from './Menu';
import Breadcrumb from '../GeneralComponents/Breadcrumb';
import CourseInfoCard from './CourseInfoCard';

/* 引入数据 */
import { CourseData } from '../data.d';
import { HomeOutlined } from '@ant-design/icons';


export default function CourseDisplay(props) {
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
              text: "查询结果",
            },
          ]}
        />
        <div>
          {
            CourseData.map((ele, index) => {
              const data = {
                title: ele.fullName,
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
  )
}