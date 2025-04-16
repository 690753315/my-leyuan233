<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"
const active = ref(0)

const onClickLeft = () => history.back()
const onClickRight = () => showToast("按钮")
</script>

<template>
  <van-nav-bar title="" safe-area-inset-top>
    <template #left>
      <div class="text-xl font-bold">发现</div>
    </template>
    <template #right>
      <van-icon name="search" size="30" color="#212121" />
    </template>
  </van-nav-bar>
</template>

<style lang="scss" scoped>
.van-nav-bar {
  height: 48px;

  background-color: #f7f6f2;
}
</style>
