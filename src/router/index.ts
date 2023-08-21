import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SortingAlgorithmsView from '@/views/SortingAlgorithmsView.vue'
import SearchAlgorithmsView from '@/views/SearchAlgorithmsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        }, {
            path: '/sort',
            name: 'sortingAlgorithms',
            component: SortingAlgorithmsView,
        }, {
            path: '/search',
            name: 'searchAlgorithms',
            component: SearchAlgorithmsView,
        },
    ],
})

export default router
