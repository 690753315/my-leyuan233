<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"
import { useTodo } from "@/hooks/useTodo"
import emitter from "@/utils/mitt"

const todo = useTodo()
const active = ref(1)

const onChange = (index: number) => {
  console.log(index)
  if (index !== 1) {
    active.value = 1

    todo()
  }
}

const onClick = () => {
  emitter.emit("refresh")
}
</script>

<template>
  <!-- <div class="h-[50px]"></div> -->
  <van-tabbar
    v-model="active"
    safe-area-inset-bottom
    active-color="#F46E23"
    inactive-color="#212121"
    @change="onChange"
  >
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="hotel-o" @click="onClick">社区</van-tabbar-item>
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
