import React, { useState, useEffect } from 'react';

import { Menu, Button, Dropdown } from 'antd';
const { SubMenu } = Menu;

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';



export default (props) => {
  const [ collapsed, setCollapsed ] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed( (collapsed) => !collapsed );
  };

  return (
    <div className="course-registration-menu">
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          添加课程
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          退选课程
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          更换课程
        </Menu.Item>
        <Menu.Item key="4" icon={<DesktopOutlined />}>
          课程评价
        </Menu.Item>
        <Menu.Item key="5" icon={<ContainerOutlined />}>
          课程信息
        </Menu.Item>
        <Menu.Item key="6" icon={<ContainerOutlined />}>
          教师评价
        </Menu.Item>
        {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu> */}
      </Menu>
    </div>
  )
}