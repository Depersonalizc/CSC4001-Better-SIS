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
      path: 'registration', 
      exact: true, 
      title: "选课界面",
      component: '@/pages/Registration/index',
    },
    // error page
    { component: '@/pages/404' },
  ],
  fastRefresh: {},
});
