import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', exact: true, component: '@/pages/HomePage/index' },
    { path: '/login', exact: true, component: '@/pages/login/index' },
  ],
  fastRefresh: {},
});
