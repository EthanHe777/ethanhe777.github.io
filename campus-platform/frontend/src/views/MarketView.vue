<template>
  <section class="space-y-6">
    <div class="card p-6">
      <h2 class="text-xl font-semibold mb-4">发布二手宝贝</h2>
      <form class="grid md:grid-cols-2 gap-3" @submit.prevent="createItem">
        <input v-model="form.title" class="input" placeholder="标题" />
        <select v-model="form.category" class="input">
          <option value="digital">数码</option>
          <option value="books">书籍</option>
          <option value="daily">生活用品</option>
          <option value="sports">运动</option>
          <option value="other">其他</option>
        </select>
        <input v-model="form.condition" class="input" placeholder="成色说明" />
        <input v-model.number="form.price" class="input" type="number" placeholder="价格" />
        <input v-model="form.location" class="input md:col-span-2" placeholder="交易地点" />
        <textarea v-model="form.description" class="input md:col-span-2" rows="3" placeholder="详细描述"></textarea>
        <input class="input md:col-span-2" type="file" multiple accept="image/*" @change="onFileChange" />
        <button class="btn-primary md:col-span-2">提交发布</button>
      </form>
    </div>

    <div class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">二手列表</h2>
        <select v-model="categoryFilter" class="input max-w-48" @change="fetchItems">
          <option value="">全部分类</option>
          <option value="digital">数码</option>
          <option value="books">书籍</option>
          <option value="daily">生活用品</option>
          <option value="sports">运动</option>
          <option value="other">其他</option>
        </select>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <article v-for="item in items" :key="item._id" class="border border-slate-200 rounded-xl p-4">
          <img v-if="item.images[0]" :src="apiOrigin + item.images[0]" class="h-40 w-full object-cover rounded-lg mb-3" />
          <h3 class="font-semibold">{{ item.title }}</h3>
          <p class="text-sm text-slate-500">{{ item.condition }} · ¥{{ item.price }}</p>
          <p class="text-sm text-slate-600 mt-2 line-clamp-2">{{ item.description }}</p>
          <p class="text-xs text-slate-400 mt-2">交易地点：{{ item.location }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import http from '../api/http';

const apiOrigin = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace('/api', '');
const categoryFilter = ref('');
const files = ref([]);
const items = ref([]);

const form = reactive({
  title: '',
  category: 'digital',
  condition: '',
  price: 0,
  location: '',
  description: ''
});

const onFileChange = (event) => {
  files.value = Array.from(event.target.files);
};

const fetchItems = async () => {
  const { data } = await http.get('/market', { params: { category: categoryFilter.value || undefined } });
  items.value = data;
};

const createItem = async () => {
  const payload = new FormData();
  Object.entries(form).forEach(([key, value]) => payload.append(key, value));
  files.value.forEach((file) => payload.append('images', file));
  await http.post('/market', payload);
  await fetchItems();
};

onMounted(fetchItems);
</script>
