import React from 'react';

/* 引入样式表 */
import './index.less';

/* 引入通用及api */
import { getStudentInfo } from '../api/api';
import {
  getCookie,
  setCookie,
} from '../../utils/GeneralFunctions';

/* 引入组件 */
import NavigatorWithTime from '../GeneralComponents/NavigatorWithTime';
import WeeklyScheduleWithPreference from '../GeneralComponents/WeeklyScheduleWithPreference';

import { 
  Descriptions, 
  Divider,
  Spin, 
} from 'antd';


/* 引入数据 */
import { 
  StudentData,
} from '../data.d';
const oneStudentData = StudentData[0];


export default function UserPage(props) {
  const [ isSpinning, setIsSpinning ] = React.useState(true);
  const [ userInfo, setUserInfo ] = React.useState(null);

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      let studentID = getCookie("studentID");

      if (studentID) {
        let studentInfo = await( getStudentInfo(studentID) );
        console.log(`return studentInfo = ${ JSON.stringify(studentInfo) }`);

        setUserInfo(studentInfo);
        setIsSpinning(false);
      }
    };

    fetchUserInfo();
  }, []);

  const transferYear = (year) => {
    // console.log(`year = ${year} with type = ${typeof year}`);
    switch(year) {
      case 1:
        return "大一";
      case 2:
        return "大二";
      case 3:
        return "大三";
      case 4:
        return "大四";
      default:
        return "unknown";
    }
  }; 

  return (
    <Spin spinning={isSpinning}>
      <div className="user-page">
        <NavigatorWithTime setIsSpinning={null} />
        <div>
          <div className="user-page-info-card">
            <Descriptions
              className="user-page-info-card-display"
              title="个人信息"
              bordered
              column={4}
              // column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="姓名" span={2}>{userInfo && userInfo.name}</Descriptions.Item>
              <Descriptions.Item label="性别">{userInfo && userInfo.gender? "男" : "女"}</Descriptions.Item>
              <Descriptions.Item label="学年">
                {userInfo && transferYear(userInfo.year)}
                {/* {userInfo && `Year-${userInfo.year}`} */}
              </Descriptions.Item>
              <Descriptions.Item label="学号" span={2}>{userInfo && userInfo.studentID}</Descriptions.Item>
              <Descriptions.Item label="主修专业" span={2}>{userInfo && userInfo.major}</Descriptions.Item>
              <Descriptions.Item label="学院" span={2}>{userInfo && userInfo.school}</Descriptions.Item>
              <Descriptions.Item label="书院" span={2}>{userInfo && userInfo.college}</Descriptions.Item>
            </Descriptions>
          </div>
          <Divider />
          <div>
            <p className="user-page-title">课程时间安排表</p>
            <WeeklyScheduleWithPreference 
              weeklyScheduleData={userInfo.weeklySchedule}
            />
          </div>
        </div>
      </div>
    </Spin>
  )
}