import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../components/register/RegisterPage.vue'

const routes = [{ path: '/register', component: RegisterPage }]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
