<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"
const active = ref(1)
</script>

<template>
  <div class="h-[50px]"></div>
  <van-tabbar
    v-model="active"
    safe-area-inset-bottom
    active-color="#F46E23"
    inactive-color="#212121"
  >
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="hotel-o">社区</van-tabbar-item>
    <van-tabbar-item icon="star-o">创作</van-tabbar-item>
    <van-tabbar-item icon="fire-o">找游戏</van-tabbar-item>
    <van-tabbar-item icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss" scoped>
.van-tar-bar {
  height: var(--van-tabbar-height);
}
</style>
