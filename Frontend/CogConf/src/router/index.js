import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/login/by-password',
            name: 'login_by_password',
            component: () =>
                import ('../views/HomeView.vue')
        },
        {
            path: '/login/by-code',
            name: 'login_by_code',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../views/HomeView.vue')
        }
    ]
})

export default router