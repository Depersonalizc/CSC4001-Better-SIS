import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { 
      path: '/', 
      exact: true, 
      title: "智能在线选课平台",
      component: '@/pages/HomePage/index' 
    },
    { 
      path: '/login', 
      exact: true, 
      title: "登录界面",
      component: '@/pages/login/index' 
    },
    {
      path: '/createAccount',
      exact: true,
      title: "创建账号",
      component: "@/pages/login/CreateAccount",
    },
    { 
      path: '/registration', 
      exact: true, 
      title: "选课界面",
      component: '@/pages/Registration/index',
    },
    {
      path: '/registration/searchClass',
      exact: true,
      title: "查询课程",
      component: "@/pages/Registration/SearchClass",
    },
    {
      path: '/registration/courseDisplay',
      exact: true,
      title: "课程查询结果",
      component: "@/pages/Registration/CourseDisplay",
    },
    {
      path: '/coursepage',
      exact: true,
      title: "课程主页",
      component: "@/pages/CoursePage/index",
    },
    {
      path: '/user',
      exact: true,
      title: "用户主页",
      component: "@/pages/UserPage/index",
    },
    // error page
    { component: '@/pages/404' },
  ],
  fastRefresh: {},
});
