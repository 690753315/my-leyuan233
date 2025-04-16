<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"

type Props = {
  type: boolean
  src: string
}

// const props = defineProps<Props>()

const show = ref(false)

const source = ref<{
  type: number
  src: string
}>({
  type: 0,
  src: ""
})

watch(show, (newValue) => {
  if (!newValue) {
    source.value = {
      type: 0,
      src: ""
    }
  }
})

const handleShow: (type: number, src: string) => void = (type, src) => {
  show.value = !show.value

  source.value.type = type
  source.value.src = src
}

defineExpose<{ handleShow: (type: number, src: string) => void }>({
  handleShow
})
</script>

<template>
  <van-overlay teleport="#app" :show="show" @click="show = false">
    <div
      class="px-4 w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      @click.stop
    >
      <!-- <van-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="contain"
        /> -->

      <video class="w-full rounded-md" src="@/assets/1.mp4" autoplay controls />
    </div>
  </van-overlay>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  /* background-color: #fff; */
  width: object-fit;
}

video {
  max-height: 80vh;
  object-fit: contain;
}
</style>
