<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"
// import { RouterView } from "vue-router"
import { List, PullRefresh } from "vant"

import TabBar from "@/components/TabBar.vue"
import NavBar from "@/components/NavBar.vue"
</script>

<template>
  <div class="app flex flex-col h-full">
    <NavBar />

    <div class="flex-1 overflow-auto">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>

    <TabBar />
  </div>
</template>

<style lang="scss" scoped>
.app {
  overflow: hidden;

  height: 100vh;

  .main {
  }
}
</style>
