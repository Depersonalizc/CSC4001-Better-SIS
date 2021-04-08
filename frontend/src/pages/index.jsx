import react, { useState, useEffect } from 'react';
import { Anchor } from 'antd';
const { Link } = Anchor;

import { Layout, Menu, Breadcrumb, Button } from 'antd';
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

/* 引入图片 */
import HomePageBackground from '@/static/images/HomePageBackground2.jpg';
import CUHKSZLogo from '../static/images/CUHKSZ_logo.png';

/* 引入样式表 */
import './index.less';

/* 引入rem计算 */
import '../utils/rem.jsx';


export default function IndexPage() {
  return (
    <div className="home-page">
      {/* <h1 className={styles.title}>Page index</h1> */}
      <div className="home-page-welcome">
        <img src={HomePageBackground} />
      </div>
      <div className="home-page-navigator">
        <img src={CUHKSZLogo} className="home-page-navigator-logo" />
        <div className="home-page-navigator-menu">
          <Menu mode="horizontal" style={{color: "blue"}}>
            <Menu.Item key="course-registration">
              <a href="/">在线选课</a>
            </Menu.Item>
            <Menu.Item key="course-evaluation">
              <a href="/">课程评价</a>
            </Menu.Item>
            <Menu.Item key="course-info">
              <a href="/">课程信息</a>
            </Menu.Item>
            <Menu.Item key="instructor-info">
              <a href="/">教师信息</a>
            </Menu.Item>
          </Menu>
        </div>
        <Button type="primary" shape="round" className="home-page-navigator-login" href="/login">
           登录/注册
        </Button>
      </div>
    </div>
  );
}
