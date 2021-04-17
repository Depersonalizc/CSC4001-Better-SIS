import React, { useState, useEffect } from 'react';

/* 引入rem计算 */
import '../../utils/rem';

/* 引入样式表 */
import './index.less';

/* 引入组件 */
import Navigator from './Navigator';
import RegistrationMenu from './Menu';

/* 引入图片 */

import { Menu, Button, Dropdown, Steps, Divider } from 'antd';
const { SubMenu } = Menu;
const { Step } = Steps;

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';


export default function Registration(props) {
  return (
    <div className="course-registration">
      <Navigator />
      <RegistrationMenu />
      <div className="course-registration-body">
        <div className="registration-progress">
          <p>添加课程流程须知</p>
          {/* <Divider /> */}
          <Steps current={1}>
            <Step title="选择学期" description="This is a description." />
            <Step title="选择课程" description="This is a description." />
            <Step title="到点抢课" description="This is a description." />
            <Step title="确定课程" description="This is a description." />
          </Steps>
        </div>
        <div>
          <p>当前步骤：选择学期</p>
          
        </div>
      </div>
    </div>
  )
}