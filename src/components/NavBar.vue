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
      <div class="text-xl font-bold find" @click="onClick">发现</div>
    </template>
    <template #right>
      <van-icon name="search" size="30" color="#212121" @click="todo" />
    </template>
  </van-nav-bar>
</template>

<style lang="scss" scoped>
$mapping: (
  "sp": (
    320px,
    480px
  ),
  "pad": (
    480px,
    768px
  ),
  "pc": 768px
);

@mixin response($device) {
  $bp: map-get($mapping, $device);

  @if type-of($bp) == "list" {
    $min: nth($bp, 1);
    $max: nth($bp, 2);

    @media (min-width: $min) and (max-width: $max) {
      @content;
    }
  } @else {
    $min: $bp;

    @media (min-width: $min) {
      @content;
    }
  }
}

.van-nav-bar {
  height: 48px;

  background-color: #f7f6f2;
}

.find {
  color: pink;

  @include response("sp") {
    color: red;
  }
  @include response("pad") {
    color: green;
  }
  @include response("pc") {
    color: blue;
  }
}
</style>
