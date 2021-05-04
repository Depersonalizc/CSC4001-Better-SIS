/* 引入Ant Design组件 */
import { Button } from 'antd';

/* 引入图片 */
import HomePageBackground from '@/static/images/HomePageBackground2.jpg';


export default function Header(props) {
  return (
		<div className="home-page-header">
			<div>
				<p>A Better SIS</p>
				<p>更方便使用，更人性化的在线选课平台</p>
				<Button 
					type="primary" 
					shape="round" 
					className="home-page-header-button"
				>
					<a href="/registration">开始使用</a>
				</Button>
				<Button type="default" shape="round" className="home-page-header-button">
					项目介绍
				</Button>
			</div>
			<img src={HomePageBackground} />
		</div>
	);
}