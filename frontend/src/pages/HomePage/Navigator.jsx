/* 引入图片 */
import CUHKSZLogo from '@/static/images/CUHKSZ_logo.png';

import { Menu, Button } from 'antd';


export default function Header(props) {
	return (
		<div className="home-page-navigator">
        <img src={CUHKSZLogo} className="home-page-navigator-logo" />
        <div >
          <Menu mode="horizontal" className="home-page-navigator-menu">
            <Menu.Item key="course-registration">
              <a href="#home-page-course-registration">在线选课</a>
            </Menu.Item>
            <Menu.Item key="course-evaluation">
              <a href="#home-page-course-evaluation">课程评价</a>
            </Menu.Item>
            <Menu.Item key="course-info">
              <a href="#home-page-course-instructor-info">课程/教师信息</a>
            </Menu.Item>
            <Menu.Item key="instructor-info">
              <a href="#home-page-developers">开发团队</a>
            </Menu.Item>
            <Menu.Item key="project-info">
              <a href="#home-page-project-info">项目信息</a>
            </Menu.Item>
          </Menu>
        </div>
        <Button type="primary" shape="round" className="home-page-navigator-login" href="/login">
          登录/注册
        </Button>
      </div>
	);
}