import React from 'react';

/* 引入api函数 */
import { SignUp } from '../api/api';

/* 引入组件 */
import NavigatorWithTime from '../GeneralComponents/NavigatorWithTime';

/* 引入Ant Design */
import {
  Avatar,
  Form,
  Input,
  Checkbox,
  Button,
  Modal,
  Radio,
  Select,
} from 'antd';

const { OptGroup } = Select;

import {
  LockOutlined,
} from '@ant-design/icons';



export default (props) => {
  const [ isModalVisible, setIsModalVisible ] = React.useState(false);
  const [ userName, setUserName ] = React.useState("");
  const [ password, setPassword ] = React.useState("");
  const [ studentName, setStudentName ] = React.useState("");
  const [ studentID, setStudentID ] = React.useState("");
  const [ year, setYear ] = React.useState("");
  const [ gender, setGender ] = React.useState(true);     // true for male, false for femalee
  const [ major, setMajor ] = React.useState("MAT");
  const [ school, setSchool ] = React.useState("SDS");
  const [ college, setCollege ] = React.useState("Shaw");

  const handleOk = async () => {
    let formData = new FormData();
    formData.append("userName", userName);
    formData.append("password", password);
    formData.append("name", studentName);
    formData.append("studentID", studentID);
    formData.append("gender", gender);
    formData.append("year", year);
    formData.append("school", school);
    formData.append("college", college);
    formData.append("major", major);

    let json = await( SignUp(formData) );
    console.log(`signup return json = ${ JSON.stringify(json) }`);

    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleGenderChange = (event) => {
    console.log(`gender event = ${ JSON.stringify(event) }`);
    setGender( event.target.value === 1? true : false );
  };
  
  // const onFormFinish = async () => {
  //   let baseURL = "http://175.24.4.124:5000";
  //   let targetURL = `${baseURL}/signup`;

  //   let formData = new FormData();
  //   formData.append("userName", userName);
  //   formData.append("password", password);
  //   formData.append("name", studentName);
  //   formData.append("studentID", studentID);
  //   formData.append("gender", gender);
  //   formData.append("year", year);
  //   formData.append("school", school);
  //   formData.append("college", college);
  //   formData.append("major", major);

  //   let resp = await( fetch(targetURL, {
  //     method: "POST",
  //     mode: "cors",
  //     body: formData,
  //   }) );
  //   let json = await( resp.json() );
  //   console.log(`signup return json = ${ JSON.stringify(json) }`);
  // };

  const onFormFinish = async () => {
    // let formData = new FormData();
    // formData.append("userName", userName);
    // formData.append("password", password);
    // formData.append("name", studentName);
    // formData.append("studentID", studentID);
    // formData.append("gender", gender);
    // formData.append("year", year);
    // formData.append("school", school);
    // formData.append("college", college);
    // formData.append("major", major);

    // let json = await( SignUp(formData) );
    // console.log(`signup return json = ${ JSON.stringify(json) }`);
  }

  const onFormFinishFailed = () => {
    alert("signup form failed");
  };


  return (
    <div>
      <NavigatorWithTime />
      <div className="margin-body">
        <div className="login-body">
          <Avatar 
            className="login-avatar" 
            icon={<LockOutlined className="login-avatar-icon" />} 
          />
          <p>Create Account</p>
          <Form
            name="basic"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFormFinish}
            onFinishFailed={onFormFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input onChange={(event) => {
                setUserName(event.target.value);
              }} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password onChange={(event) => {
                setPassword(event.target.value);
              }} />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                onClick={() => setIsModalVisible(true)}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          <Modal 
            title="Please fill in this form to let us know you better" 
            visible={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}
          >
            <Form
              name="basic"
              className="login-form"
              initialValues={{ remember: true }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input onChange={(event) => setStudentID(event.target.value)} />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true,  }]}
              >
                <Radio.Group onChange={handleGenderChange} value={gender}>
                  <Radio value={1}>Male</Radio>ss
                  <Radio value={2}>Female</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Year"
                name="year"
                rules={[{ required: true, message: 'Please input your age!' }]}
              >
                <Select onChange={(value) => {
                  console.log(`value = ${ value }`);
                  setYear(value);
                }}>
                  <OptGroup label="本科生">
                    <Option value="大一">大一</Option>
                    <Option value="大二">大二</Option>
                    <Option value="大三">大三</Option>
                    <Option value="大四">大四</Option>
                  </OptGroup>
                  <Option value="硕士生">硕士生</Option>
                  <Option value="博士生">博士生</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Student ID"
                name="studentID"
                rules={[{ required: true, message: 'Please input your student ID!' }]}
              >
                <Input onChange={(event) => setStudentID(event.target.value)} />
              </Form.Item>
              <Form.Item
                label="Major"
                name="major"
                rules={[{required: true,}]}
              >
                <Select onChange={(value) => setMajor(value)}>
                  <Option value="MAT">数学</Option>
                  <Option value="STA">统计</Option>
                  <Option value="CSC">计算机科学与工程</Option>
                  <Option value="EIE">电子信息工程</Option>
                  <Option value="ECO">经济</Option>
                  <Option value="MKT">市场营销</Option>
                  <Option value="BME">生物医学工程</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="School"
                name="school"
                rules={[{ required: true,}]}
              >
                <Select onChange={(value) => setSchool(value)}>
                  <Option value="SME">经管学院</Option>
                  <Option value="SSE">理工学院</Option>
                  <Option value="SDS">数据科学学院</Option>
                  <Option value="LHS">生命健康学院</Option>
                  <Option value="HSS">人文社课学院</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="College"
                name="college"
                rules={[{required: true,}]}
              >
                <Select onChange={(value) => setCollege(value)}>
                  <Option value="Shaw">逸夫书院</Option>
                  <Option value="Muse">思廷书院</Option>
                  <Option value="Diligentia">学勤书院</Option>
                  <Option value="Harmonia">祥波书院</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  )
}