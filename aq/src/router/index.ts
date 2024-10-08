import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LoginView from '../views/LoginView.vue';
import Settings from '../views/Settings.vue';
import SubDevices from '../views/SubDevices.vue';

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/login', component: LoginView },
  { path: '/settings', component: Settings },
  {
    path: '/device/:uuid/subdevices',
    name: 'SubDevices',
    component: SubDevices,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

