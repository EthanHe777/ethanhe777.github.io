import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import MarketView from '../views/MarketView.vue';
import ErrandsView from '../views/ErrandsView.vue';
import ProfileView from '../views/ProfileView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/auth', name: 'auth', component: AuthView },
  { path: '/market', name: 'market', component: MarketView },
  { path: '/errands', name: 'errands', component: ErrandsView },
  { path: '/profile', name: 'profile', component: ProfileView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
