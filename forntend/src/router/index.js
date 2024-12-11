import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'

const isLogged = localStorage.getItem('token') && true

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach(async (to, from) => {
  if (

    !isLogged &&
    (to.name !== 'login' && to.name !== 'register')
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  } else if (
    isLogged &&
    (to.name === 'login' || to.name === 'register')
  ) {
    // redirect the user to the home page
    return { name: 'home' }
  }
})

export default router
