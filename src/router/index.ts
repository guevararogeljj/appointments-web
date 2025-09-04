import { createRouter, createWebHistory } from 'vue-router'

import PortfolioView from '../views/PortfolioView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'portfolio',
      component: PortfolioView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/chatbot-ai',
      name: 'ChatbotAIDetail',
      component: () => import('../views/ChatbotAIDetail.vue'),
    },
    {
      path: '/chatbot-kconsultores',
      name: 'ChatbotKConsultoresDetail',
      component: () => import('../views/ChatbotKConsultoresDetail.vue'),
    },
    {
      path: '/chatbot-reto97',
      name: 'ChatbotReto97Detail',
      component: () => import('../views/ChatbotReto97Detail.vue')
    },
    {
      path: '/monitor-guid',
      name: 'MonitorGuidDetail',
      component: () => import('../views/MonitorDetail.vue')
    },
  ],
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('jwtToken');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
