/* 引入Ant Design组件 */
import { Button } from 'antd';

/* 引入图片 */
import CourseRegistrationImg from '@/static/images/course-registration.jpg';


export default function CourseRegistration(props) {
  return (
		<div id="home-page-course-registration">
			<img src={CourseRegistrationImg} />
			<div>
				<p>新特性</p>
				<ul>
					<li>即时预览一周课程表，直观展示你的课程安排</li>
					<li>智能检测课程时间冲突，减轻选课压力</li>
					<li>一键排课，自动生成理想课表</li>
				</ul>
				<Button type="primary" shape="round" className="home-page-course-registration-button">
					开始选课
				</Button>
			</div>
		</div>
	);
}