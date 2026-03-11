<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-40">
      <nav class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <router-link to="/" class="text-ecjtu-700 font-bold text-lg">华东交大 · 校园服务平台</router-link>
        <div class="flex items-center gap-4 text-sm">
          <router-link to="/market" class="hover:text-ecjtu-700">二手交易</router-link>
          <router-link to="/errands" class="hover:text-ecjtu-700">校园跑腿</router-link>
          <router-link to="/profile" class="hover:text-ecjtu-700">个人中心</router-link>
          <router-link to="/auth" class="btn-outline">登录/注册</router-link>
        </div>
      </nav>
    </header>
    <main class="max-w-6xl mx-auto p-4 md:p-6">
      <slot />
    </main>
  </div>
</template>
