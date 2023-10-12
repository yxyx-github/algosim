import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SortingAlgorithmsView from '@/views/SortingAlgorithmsView.vue'
import SearchAlgorithmsView from '@/views/SearchAlgorithmsView.vue'
import SortingQuizView from '@/views/SortingQuizView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        }, {
            path: '/sort',
            name: 'sort',
            component: SortingAlgorithmsView,
        }, {
            path: '/sort/quiz',
            name: 'sort.quiz',
            component: SortingQuizView,
        }, {
            path: '/search',
            name: 'search',
            component: SearchAlgorithmsView,
        },
    ],
})

export default router
