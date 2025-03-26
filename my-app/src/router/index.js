import { createStore } from 'vuex';
import { login, register, addCart } from '../utils/api';

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
      next();
      return;
  }
  next('/home');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
      next();
      return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../components/ProductList.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path:'/signup',
    name: 'signup',
    component: () => import('../components/Register.vue')
  },
  {
    path:'/logout',
    name:'logout',
    component: () => import('../components/Logout.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;