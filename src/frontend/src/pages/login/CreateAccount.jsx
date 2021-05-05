import React from 'react';

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
import {
  LockOutlined,
} from '@ant-design/icons';



export default (props) => {
  const [ isModalVisible, setIsModalVisible ] = React.useState(false);
  const [ gender, setGender ] = React.useState(true);     // true for male, false for femalee
  const [ major, setMajor ] = React.useState("MAT");
  const [ school, setSchool ] = React.useState("SDS");
  const [ college, setCollege ] = React.useState("Shaw");

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleGenderChange = (event) => {
    setGender( event.target.value === 1? true : false );
  };
  const handleSchoolChange = (event) => {
    setSchool( event.target.value );
  };
  const handleCollegeChange = (event) => {
    setCollege(event.target.value);
  };
  const handleMajorChange = (event) => {
    setMajor(event.target.value);
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
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
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
                <Input />
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
                label="Age"
                name="age"
                rules={[{ required: true, message: 'Please input your age!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Student ID"
                name="studentID"
                rules={[{ required: true, message: 'Please input your student ID!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Major"
                name="major"
                rules={[{required: true,}]}
              >
                <Select onChange={handleMajorChange}>
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
                <Select onChange={handleSchoolChange}>
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
                <Select onChange={handleCollegeChange}>
                  <Option value="Shaw">逸夫书院</Option>
                  <Option value="Muse">思廷书院</Option>
                  <Option value="Diligentia">学勤书院</Option>
                  <Option value="Harmonia">祥波书院</Option>
                </Select>
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
          </Modal>
        </div>
      </div>
    </div>
  )
}