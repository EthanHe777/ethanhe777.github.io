<template>
  <section class="space-y-6">
    <div class="card p-6" v-if="profile">
      <h2 class="text-xl font-semibold">个人中心</h2>
      <p class="mt-2">昵称：{{ profile.user.nickname }}</p>
      <p>邮箱：{{ profile.user.email }}</p>
      <p class="text-slate-500 text-sm">{{ profile.user.bio || '这个同学还没有填写个人简介。' }}</p>
    </div>

    <div class="grid md:grid-cols-3 gap-4" v-if="profile">
      <div class="card p-4">
        <h3 class="font-semibold mb-3">我发布的宝贝</h3>
        <ul class="space-y-2 text-sm text-slate-600">
          <li v-for="item in profile.publishedItems" :key="item._id">{{ item.title }} · ¥{{ item.price }}</li>
        </ul>
      </div>
      <div class="card p-4">
        <h3 class="font-semibold mb-3">我发布的任务</h3>
        <ul class="space-y-2 text-sm text-slate-600">
          <li v-for="task in profile.publishedTasks" :key="task._id">{{ task.title }} · {{ task.status }}</li>
        </ul>
      </div>
      <div class="card p-4">
        <h3 class="font-semibold mb-3">我承接的任务 / 收藏夹</h3>
        <ul class="space-y-2 text-sm text-slate-600">
          <li v-for="task in profile.acceptedTasks" :key="task._id">任务：{{ task.title }}</li>
          <li v-for="fav in profile.user.favorites" :key="fav._id">收藏：{{ fav.title }}</li>
        </ul>
      </div>
    </div>

    <div class="card p-6" v-else>
      请先登录后查看个人中心。
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import http from '../api/http';

const profile = ref(null);

onMounted(async () => {
  try {
    const { data } = await http.get('/profile/me');
    profile.value = data;
  } catch (error) {
    profile.value = null;
  }
});
</script>
