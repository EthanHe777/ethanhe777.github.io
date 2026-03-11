<template>
  <section class="grid md:grid-cols-2 gap-6">
    <div class="card p-6">
      <h2 class="text-xl font-semibold mb-4">注册</h2>
      <form class="space-y-3" @submit.prevent="onRegister">
        <input v-model="registerForm.nickname" class="input" placeholder="昵称" />
        <input v-model="registerForm.email" class="input" placeholder="学校邮箱" />
        <input v-model="registerForm.password" class="input" type="password" placeholder="密码" />
        <button class="btn-primary w-full">注册</button>
      </form>
    </div>

    <div class="card p-6">
      <h2 class="text-xl font-semibold mb-4">登录</h2>
      <form class="space-y-3" @submit.prevent="onLogin">
        <input v-model="loginForm.email" class="input" placeholder="学校邮箱" />
        <input v-model="loginForm.password" class="input" type="password" placeholder="密码" />
        <button class="btn-primary w-full">登录</button>
      </form>
      <p v-if="message" class="mt-4 text-sm text-ecjtu-700">{{ message }}</p>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const message = ref('');

const registerForm = reactive({ nickname: '', email: '', password: '' });
const loginForm = reactive({ email: '', password: '' });

const onRegister = async () => {
  try {
    await authStore.register(registerForm);
    message.value = '注册成功，已自动登录。';
  } catch (error) {
    message.value = error.response?.data?.message || '注册失败';
  }
};

const onLogin = async () => {
  try {
    await authStore.login(loginForm);
    message.value = '登录成功。';
  } catch (error) {
    message.value = error.response?.data?.message || '登录失败';
  }
};
</script>
