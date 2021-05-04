import { Descriptions, Badge, Button } from 'antd';



export default function CourseInfoCard(props) {
  return (
    <div className="course-info-card">
      <p className="text-highlight">
        <a href={props.data.coursePageLink}>{props.data.title}</a>
      </p>
      <Descriptions bordered column={3} style={{width: "80%",}}>
        <Descriptions.Item label="Sessions" span={1}>
          <span>2 Lectures</span>
          <br />
          <span>4 Tutorials</span>
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
          <a>Jane You</a>
        </Descriptions.Item>
        <Descriptions.Item label="授课方式">{props.data.mode}</Descriptions.Item>
      </Descriptions>

      {/* <Descriptions bordered column={3}>
        <Descriptions.Item label="Session" span={1}>Lecture-01</Descriptions.Item>
        <Descriptions.Item label="状态">
          <Badge status="success" text="有余位" />
        </Descriptions.Item>
        <Descriptions.Item label="添加课程入口">
          <a>添加课程</a>
        </Descriptions.Item>
        <Descriptions.Item label="已选人数/总位置数">129/150</Descriptions.Item>
        <Descriptions.Item label="授课教师">
          <a>Jane You</a>
        </Descriptions.Item>
        <Descriptions.Item label="学分">3</Descriptions.Item>
        <Descriptions.Item label="课程时间" span={2} className="course-info-card-classtime">
          <span>Thursday 14:30-15:50PM</span> 
          <span>Friday 14:00-15:20PM</span>
        </Descriptions.Item>
        <Descriptions.Item label="教室">Online Zoom</Descriptions.Item>
      </Descriptions> */}
    </div>
  )
}