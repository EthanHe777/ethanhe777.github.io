<template>
  <section class="space-y-6">
    <div class="card p-6">
      <h2 class="text-xl font-semibold mb-4">发布校园跑腿任务</h2>
      <form class="grid md:grid-cols-2 gap-3" @submit.prevent="createTask">
        <input v-model="form.title" class="input" placeholder="任务标题" />
        <select v-model="form.type" class="input">
          <option value="substitute-class">代课</option>
          <option value="pickup-delivery">代取快递</option>
          <option value="campus-run">代校园跑</option>
        </select>
        <input v-model.number="form.reward" class="input" type="number" placeholder="赏金金额" />
        <textarea v-model="form.description" class="input md:col-span-2" rows="3" placeholder="任务说明"></textarea>
        <button class="btn-primary md:col-span-2">发布任务</button>
      </form>
    </div>

    <div class="card p-6">
      <h2 class="text-xl font-semibold mb-4">任务状态追踪</h2>
      <div class="space-y-3">
        <div v-for="task in tasks" :key="task._id" class="border border-slate-200 rounded-xl p-4">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">{{ task.title }}</h3>
            <span class="text-sm px-2 py-1 rounded-full bg-ecjtu-50 text-ecjtu-700">{{ statusMap[task.status] }}</span>
          </div>
          <p class="text-sm text-slate-600 mt-2">{{ task.description }}</p>
          <p class="text-sm mt-2">类型：{{ typeMap[task.type] }} · 赏金：¥{{ task.reward }}</p>
          <div class="mt-3 flex gap-2">
            <button class="btn-outline" @click="updateStatus(task._id, 'in-progress')">设为进行中</button>
            <button class="btn-primary" @click="updateStatus(task._id, 'completed')">设为已完成</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import http from '../api/http';

const statusMap = { pending: '待接单', 'in-progress': '进行中', completed: '已完成' };
const typeMap = { 'substitute-class': '代课', 'pickup-delivery': '代取快递', 'campus-run': '代校园跑' };
const tasks = ref([]);
const form = reactive({ title: '', type: 'pickup-delivery', reward: 0, description: '' });

const fetchTasks = async () => {
  const { data } = await http.get('/errands');
  tasks.value = data;
};

const createTask = async () => {
  await http.post('/errands', form);
  await fetchTasks();
};

const updateStatus = async (id, status) => {
  await http.patch(`/errands/${id}/status`, { status });
  await fetchTasks();
};

onMounted(fetchTasks);
</script>
