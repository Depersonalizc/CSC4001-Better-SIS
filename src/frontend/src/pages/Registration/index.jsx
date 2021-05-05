import React, { useState, useEffect } from 'react';

/* 引入rem计算 */
import '../../utils/rem';

/* 引入样式表 */
import './index.less';

/* 引入组件 */
import Navigator from './Navigator';
import RegistrationMenu from './Menu';
import Breadcrumb from '../GeneralComponents/Breadcrumb';

/* 引入图片 */
import { Menu, Button, Dropdown, Steps, Divider, Table } from 'antd';
const { SubMenu } = Menu;
const { Step } = Steps;

import {
  HomeOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

/* 引入数据 */
import {
  TermListData,
} from '../data.d';




export default function Registration(props) {
  const [ TermList, setTermList ] = React.useState([]);

  React.useEffect(() => {
    const fetchTermList = async () => {
      const baseURL = "http://175.24.4.124:5000";
      const targetURL = `${baseURL}/getTermInfo`;
      let resp = await( fetch(targetURL, {
        method: "GET",
        mode: "cors",
      }) );
      let text = await( resp.text() );
      console.log(`text = ${ text } with type = ${typeof text}`);

      let array = eval( text );
      console.log(`array = ${array} with type = ${Object.prototype.toString.call(array)}`);
      setTermList(array);
    };

    fetchTermList();
  }, []);

  const TermTableColumns = [
    {
      title: "Term",
      dataIndex: "term",
    },
    // {
    //   title: "name",
    //   dataIndex: "name",
    // },
  ];

  return (
    <div className="course-registration">
      <Navigator />
      {/* <RegistrationMenu /> */}
      <div className="course-registration-body">
        <Breadcrumb 
          data={[
            {
              href: "/",
              icon: <HomeOutlined className="breadcrumb-icon" />,
              text: "Home",
            },
            {
              href: "",
              icon: <HomeOutlined className="breadcrumb-icon" />,
              text: "选课系统",
            },
            {
              href: null,
              icon: null,
              text: "选择课程",
            },
          ]}
        />
        <div className="registration-progress">
          <p className="sub-title">添加课程流程须知</p>
          {/* <Divider /> */}
          <Steps current={1} style={{width: "70%",}}>
            <Step title="选择学期" description="This is a description." />
            <Step title="选择课程" description="This is a description." />
            <Step title="到点抢课" description="This is a description." />
            <Step title="确定课程" description="This is a description." />
          </Steps>
          <Divider />
        </div>
        <div style={{width: "50%",}}>
          <p className="sub-title">当前步骤：选择学期</p>
          <Table 
            className="select-term-table"
            bordered
            // style={{width: "70%",}}
            rowSelection={{
              type: "radio"
            }}
            columns={TermTableColumns}
            dataSource={TermList.map((ele) => {
              return {
                term: ele,
                name: "hello world!",
              }
            })}
            pagination={false}
          />
          <div className="select-term-button">
            <Button
              href="/registration/searchClass"
              type="primary"  
            >
              下一步
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}