import {
  Breadcrumb,
  Divider,
} from 'antd';

import { 
  HomeOutlined, 
  UserOutlined, 
} from '@ant-design/icons';



export default (props) => {
  return (
    <div className="bread-crumb">
      <Breadcrumb className="bread-crumb">
        {
          props.data.map((ele, index) => {
            return (
              <Breadcrumb.Item key={index} href={ele.href}>
                {ele.icon}
                <span>{ele.text}</span>
              </Breadcrumb.Item>
            )
          })
        }
        {/* <Breadcrumb.Item href="/">
          <HomeOutlined className="breadcrumb-icon" />
          <span>主页</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <UserOutlined className="breadcrumb-icon" />
          <span>课程页面</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>CSC4001</Breadcrumb.Item> */}
      </Breadcrumb>
      <Divider />
    </div>
  );
}