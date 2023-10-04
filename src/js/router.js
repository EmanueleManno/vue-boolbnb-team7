import {createRouter, createWebHistory} from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ApartmentPage from '../pages/ApartmentPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', name: 'home', component: HomePage},
        {path:'/apartments/:id', name: 'apartment', component: ApartmentPage},
        {path:'/:pathMatch(.*)*', redirect: '/'},
    ]
});

export{router};