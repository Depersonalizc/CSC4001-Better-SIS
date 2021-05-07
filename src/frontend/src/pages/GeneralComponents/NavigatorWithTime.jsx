import React, { useState, useEffect } from 'react';

/* 引入通用及api函数 */
import { getStudentInfo } from '../api/api';
import {
  getCookie,
  setCookie,
  deleteCookie,
} from '../../utils/GeneralFunctions';

/* 引入图片 */
import CUHKSZLogo from '@/static/images/CUHKSZ_logo.png';

/* 引入Ant Design */
import { 
  Menu,
  Button, 
  Dropdown,
  Spin, 
} from 'antd';
import { HomeOutlined, AppstoreOutlined, SettingOutlined, WindowsOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

export default function NavigatorWithTime(props) {
  // const [ isSpinning, setIsSpinning ] = React.useState(true);
  const [ currentTime, setCurrentTime ] = React.useState( new Date() );
  const [ userName, setUserName ] = React.useState("");

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
        if ( window.location.pathname !== "/login" ) {
          alert("Your login has been expired, please login again.");
          window.location.href = "/login";
        }
      }
    };
    fetchStudentInfo();
  }, []);

  React.useEffect(() => {
    setInterval( () => {
      setCurrentTime( new Date() )
    }, 1000 );
    console.log(`set an interval`);
  }, []);

  const dateFormat = (date) => {
    try {
      let year = ( date.getFullYear() ).toString();
      let month = ( date.getMonth() + 1 ).toString();
      let day = ( date.getDate() ).toString();
      let hour = ( date.getHours() ).toString();
      let minute = ( date.getMinutes() ).toString();
      let second = ( date.getSeconds() ).toString();
      month = (month.length === 1)? "0"+month : month;
      day = (day.length === 1)? '0'+day : day;
      hour = (hour.length === 1)? "0"+hour : hour;
      minute = (minute.length === 1)? "0"+minute : minute;
      second = (second.length === 1)? "0"+second : second;
      return `${year}年${month}月${day}日   ${hour}:${minute}:${second}`;
    }
    catch(error) {
      throw new Error(`${error}`);
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/user">
          个人主页
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/">
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
    <Spin spinning={false}>
      <div className="navigator">
        <img src={CUHKSZLogo} className="navigator-logo" />
        <div className="navigator-time">
          <span>当前系统时间: </span>
          <span>{ dateFormat(currentTime) }</span>
          <span>(GMT+08:00)</span>
        </div>
        <div className="navigator-content">
          <Menu mode="horizontal">
            <Menu.Item key="mail" icon={<HomeOutlined />}>
              {/* <a href="/" target="_blank" rel="noreferrer"> */}
              <a href="/">
                返回主页
              </a>
            </Menu.Item>
          </Menu>
        </div>
        <div className="navigator-user-info">
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button type="primary" shape="round" className="navigator-user-button">{userName? `你好，${userName}` : "登录/注册"}</Button>
          </Dropdown>
        </div>
      </div>
    </Spin>
  );
}