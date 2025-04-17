<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"
import { useTodo } from "@/hooks/useTodo"
import emitter from "@/utils/mitt"

const todo = useTodo()

const onClick = () => {
  emitter.emit("refresh")
}
</script>

<template>
  <van-nav-bar title="" safe-area-inset-top>
    <template #left>
      <div class="text-xl font-bold" @click="onClick">发现</div>
    </template>
    <template #right>
      <van-icon name="search" size="30" color="#212121" @click="todo" />
    </template>
  </van-nav-bar>
</template>

<style lang="scss" scoped>
.van-nav-bar {
  height: 48px;

  background-color: #f7f6f2;
}
</style>
