<!-- src/components/NotFound.vue -->
<template>
  <div class="not-found">
    <div class="error-code">404</div>
    <h1>页面未找到</h1>
    <p>你访问的页面不存在。请检查URL是否正确，或者返回社区。</p>
    <router-link to="/" class="home-link">返回社区</router-link>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "404"
})
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  padding: 20px;

  font-family: Arial, sans-serif;

  color: #333;
  background-color: #f0f2f5;
}

.error-code {
  margin-bottom: 20px;

  font-size: 150px;
  font-weight: bold;

  color: #ff6b6b;
}

h1 {
  margin-bottom: 10px;

  font-size: 2em;
}

p {
  margin-bottom: 20px;

  font-size: 1.2em;
}

.home-link {
  display: inline-block;

  padding: 10px 20px;

  font-size: 1em;

  transition: background-color 0.3s ease;
  text-decoration: none;

  color: #fff;
  border-radius: 5px;
  background-color: #ff6b6b;
}

.home-link:hover {
  background-color: #ff4d4d;
}
</style>
