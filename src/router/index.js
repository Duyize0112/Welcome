import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../Views/HomeView.vue';
import StudentListView from '../Views/StudentListView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/students',
    name: 'StudentList',
    component: StudentListView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
