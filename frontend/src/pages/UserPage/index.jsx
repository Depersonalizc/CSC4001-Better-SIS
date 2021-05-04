/* 引入样式表 */
import './index.less';

/* 引入组件 */
import NavigatorWithTime from '../GeneralComponents/NavigatorWithTime';
import WeeklyScheduleWithPreference from '../GeneralComponents/WeeklyScheduleWithPreference';

import { Descriptions, Divider } from 'antd';


/* 引入数据 */
import { StudentData } from '../data.d';
const oneStudentData = StudentData[0];


export default function UserPage(props) {
  return (
    <div className="user-page">
      <NavigatorWithTime />
      <div className="user-page-info-card">
        <Descriptions
          className="user-page-info-card-display"
          title="个人信息"
          bordered
          column={4}
          // column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="姓名" span={2}>{oneStudentData.name}</Descriptions.Item>
          <Descriptions.Item label="性别">{oneStudentData.gender? "男" : "女"}</Descriptions.Item>
          <Descriptions.Item label="年龄">{oneStudentData.age}</Descriptions.Item>
          <Descriptions.Item label="学号" span={2}>{oneStudentData.studentID}</Descriptions.Item>
          <Descriptions.Item label="主修专业" span={2}>{oneStudentData.major}</Descriptions.Item>
          <Descriptions.Item label="学院" span={2}>{oneStudentData.school}</Descriptions.Item>
          <Descriptions.Item label="书院" span={2}>{oneStudentData.college}</Descriptions.Item>
        </Descriptions>
      </div>
      <Divider />
      <p className="user-page-title">课程时间安排表</p>
      <WeeklyScheduleWithPreference />
    </div>
  )
}