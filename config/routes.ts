export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', layout: false, component: './user/login' },
      { path: '/user', redirect: '/user/login' },
      { icon: 'smile', path: '/user/register-result', component: './user/register-result' },
      { icon: 'smile', path: '/user/register', component: './user/register' },
      { component: '404', path: '/user/*' },
    ],
  },
  {
    path: '/dashboard',
    icon: 'dashboard',
    routes: [
      { path: '/dashboard', redirect: '/dashboard/analysis' },
      { icon: 'smile', path: '/dashboard/analysis', component: './dashboard/analysis' },
      { icon: 'smile', path: '/dashboard/monitor', component: './dashboard/monitor' },
      { icon: 'smile', path: '/dashboard/workplace', component: './dashboard/workplace' },
    ],
  },
  {
    path: '/form',
    icon: 'form',
    routes: [
      { path: '/form', redirect: '/form/basic-form' },
      { icon: 'smile', path: '/form/basic-form', component: './form/basic-form' },
      { icon: 'smile', path: '/form/step-form', component: './form/step-form' },
      { icon: 'smile', path: '/form/advanced-form', component: './form/advanced-form' },
    ],
  },
  {
    path: '/list',
    icon: 'table',
    routes: [
      {
        path: '/list/search',
        component: './list/search',
        routes: [
          { path: '/list/search', redirect: '/list/search/articles' },
          { icon: 'smile', path: '/list/search/articles', component: './list/search/articles' },
          { icon: 'smile', path: '/list/search/projects', component: './list/search/projects' },
          {
            icon: 'smile',
            path: '/list/search/applications',
            component: './list/search/applications',
          },
        ],
      },
      { path: '/list', redirect: '/list/table-list' },
      { icon: 'smile', path: '/list/table-list', component: './table-list' },
      { icon: 'smile', path: '/list/basic-list', component: './list/basic-list' },
      { icon: 'smile', path: '/list/card-list', component: './list/card-list' },
    ],
  },
  {
    path: '/profile',
    icon: 'profile',
    routes: [
      { path: '/profile', redirect: '/profile/basic' },
      { icon: 'smile', path: '/profile/basic', component: './profile/basic' },
      { icon: 'smile', path: '/profile/advanced', component: './profile/advanced' },
    ],
  },
  {
    icon: 'CheckCircleOutlined',
    path: '/result',
    routes: [
      { path: '/result', redirect: '/result/success' },
      { icon: 'smile', path: '/result/success', component: './result/success' },
      { icon: 'smile', path: '/result/fail', component: './result/fail' },
    ],
  },
  {
    icon: 'warning',
    path: '/exception',
    routes: [
      { path: '/exception', redirect: '/exception/403' },
      { icon: 'smile', path: '/exception/403', component: './exception/403' },
      { icon: 'smile', path: '/exception/404', component: './exception/404' },
      { icon: 'smile', path: '/exception/500', component: './exception/500' },
    ],
  },
  {
    icon: 'user',
    path: '/account',
    routes: [
      { path: '/account', redirect: '/account/center' },
      { icon: 'smile', path: '/account/center', component: './account/center' },
      { icon: 'smile', path: '/account/settings', component: './account/settings' },
    ],
  },
  { path: '/', redirect: '/dashboard/analysis' },
  { component: '404', path: '/*' },
];
