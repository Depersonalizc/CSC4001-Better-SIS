/* 引入Ant Design组件 */
import { Button } from 'antd';

/* 引入图片 */
import CourseEvaluationImg from '@/static/images/course-evaluation.jpg';


export default function CourseEvaluation(props) {
  return (
		<div id="home-page-course-evaluation">
			<img src={CourseEvaluationImg} />
			<div>
				<p>搭配课程评价系统</p>
				<ul>
					<li>选课期间同步了解课程评价，选课不踩坑</li>
					<li>分享自己的课程体验，写出心底的声音</li>
				</ul>
				<Button type="primary" shape="round" className="home-page-course-evaluation-button">
					课程评价
				</Button>
			</div>
		</div>
	);
}