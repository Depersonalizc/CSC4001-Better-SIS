import React from 'react';

/* 引入样式表 */
import './index.less';

/* 引入组件 */
import NavigatorWithTime from '../GeneralComponents/NavigatorWithTime';

/* 引入Ant Design */
import {
  Avatar,
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import {
  LockOutlined,
} from '@ant-design/icons';


export default (props) => {
  const [ userName, setUserName ] = React.useState("");
  const [ password, setPassword ] = React.useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onFormFinish = async () => {
    console.log(`login form finish`);

    let baseURL = "http://175.24.4.124:5000";
    let targetURL = `${baseURL}/signin`;
    let resp = await( fetch(targetURL, {
      method: "POST",
      mode: "cors",
      headers: {
  　　　　'Content-Type': 'application/json',
  　　},
  　　body: JSON.stringify({
    　　studentID: userName,
        password: password,
  　　})
    }) );
    let json = await( resp.json() );
    console.log(`return json = ${ JSON.stringify(json) }`);
  };
  const onFormFailed = () => {
    alert("login form failed, please try again");
    // throw new Error(`login form failed`);
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
          <p>SignIn</p>
          <Form
            name="basic"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFormFinish}
            onFinishFailed={onFormFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              className="login-form-item"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input onChange={handleUserNameChange} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              className="login-form-item"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password onChange={handlePasswordChange} />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" style={{display: "inline-block", height: "6rem",}}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <div className="signup-div">
              <a href="/createAccount" className="signup-link">Don't have an account? Create One</a>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width: "20rem",}}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          <div className="copyright">
            <p>
              {`Copyright © `}
              <a href="https://github.com/Depersonalizc/CSC4001-Better-SIS/tree/main/src">CSC4001 Group Members</a>
              {' '}
              {new Date().getFullYear()}
              {'.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignIn() {
//   const classes = useStyles();

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <form className={classes.form} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={8}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }