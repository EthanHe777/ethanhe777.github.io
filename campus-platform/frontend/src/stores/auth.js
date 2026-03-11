import { defineStore } from 'pinia';
import http from '../api/http';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.user)
  },
  actions: {
    async register(payload) {
      const { data } = await http.post('/auth/register', payload);
      this.persistAuth(data);
    },
    async login(payload) {
      const { data } = await http.post('/auth/login', payload);
      this.persistAuth(data);
    },
    persistAuth(data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.user = data.user;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.user = null;
    }
  }
});
