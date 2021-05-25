import React from 'react';

/* 引入图片 */
import CUHKSZLogo from '@/static/images/CUHKSZ_logo.png';

/* 引入通用及api函数 */
import { getStudentInfo } from '../api/api';
import {
  getCookie,
  setCookie,
  deleteCookie,
} from '../../utils/GeneralFunctions';

/* 引入Ant Design */
import { 
  Menu, 
  Button,
  Spin,
  Dropdown,
} from 'antd';


export default function Header(props) {
  const [ userName, setUserName ] = React.useState(null);


  React.useEffect(() => {
    const fetchStudentInfo = async () => {
      let studentID = getCookie("studentID");
      console.log(`student id cookie data = ${studentID}`);
      if (studentID) {
        let returnJSON = await( getStudentInfo(studentID) );
        console.log(`return studentInfo = ${ JSON.stringify(returnJSON) }`);
        
        console.log(`student name = ${returnJSON["name"]}`);
        setUserName( returnJSON["name"] );
        props.setIsSpinning && props.setIsSpinning(false);
        console.log(`set isSpinning to false`);
      } else {
        // window.location.pathname;
        // console.log(`window.location.pathname = ${ window.location.pathname }`);
        if ( window.location.pathname !== "/" && window.location.pathname !== "/login" ) {
          alert("Your login has been expired, please login again.");
          window.location.href = "/login";
        }
        if ( window.location.pathname === "/" ) {
          props.setIsSpinning && props.setIsSpinning(false);
        }
      }
    };
    fetchStudentInfo();
  }, []);


  const logout = () => {
    deleteCookie("studentID");
    window.location.href = "/";
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/user">
          个人主页
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={logout}>
          登出
        </a>
      </Menu.Item>
      {/* <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      </Menu.Item> */}
    </Menu>
  );


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
        {
          userName?
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button type="primary" shape="round" className="home-page-navigator-login" href="/login">
              {`你好，${userName}`}
            </Button>
          </Dropdown>
          :
          <Button type="primary" shape="round" className="home-page-navigator-login" href="/login">
            {"登录/注册"}
          </Button>
        }
      </div>
	);
}