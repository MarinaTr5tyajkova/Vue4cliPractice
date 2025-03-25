import { createStore } from 'vuex';
import { login, register, addCart } from '../utils/api';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path:'/signup',
    name: 'signup',
    component: () => import('../components/Register.vue')
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;