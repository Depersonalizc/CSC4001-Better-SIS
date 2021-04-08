import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', exact: true, component: '@/pages/index' },
    { path: '/login', exact: true, component: '@/pages/login/index' },
  ],
  fastRefresh: {},
});
