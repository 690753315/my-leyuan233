<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue"
import { toRefs } from "vue"
import { useRoute } from "vue-router"

import Overlay from "@/components/Overlay.vue"

import { getList } from "./utils"
import { showToast, PullRefresh } from "vant"

import emitter from "@/utils/mitt"

const route = useRoute()
const { symbol } = toRefs(route.query)

// const list = [
//   {
//     height: 200,
//     background: "red"
//   },
//   {
//     height: 230,
//     background: "pink"
//   },
//   {
//     height: 250,
//     background: "blue"
//   },
//   {
//     height: 300,
//     background: "pink"
//   },
//   {
//     height: 280,
//     background: "black"
//   },
//   {
//     height: 200,
//     background: "deeppink"
//   },
//   {
//     height: 230,
//     background: "brown"
//   },
//   {
//     height: 250,
//     background: "skyblue"
//   },
//   {
//     height: 300,
//     background: "green"
//   },
//   {
//     height: 280,
//     background: "orange"
//   },
//   // -------------------------------
//   {
//     height: 300,
//     background: "red"
//   },
//   {
//     height: 250,
//     background: "pink"
//   },
//   // -------------------------------
//   {
//     height: 400,
//     background: "blue"
//   },
//   {
//     height: 100,
//     background: "pink"
//   },
//   {
//     height: 50,
//     background: "black"
//   },
//   // -------------------------------
//   {
//     height: 200,
//     background: "deeppink"
//   },
//   {
//     height: 300,
//     background: "brown"
//   },
//   {
//     height: 400,
//     background: "skyblue"
//   },
//   {
//     height: 100,
//     background: "green"
//   },
//   {
//     height: 50,
//     background: "orange"
//   }
//   // -------------------------------
// ]
const mylist = ref<number[]>([])

const waterList = reactive<any[]>([])

// 维护每一列的高度的数组
const heightList = ref<number[]>([])

let gapH = 6 // 间距

// 可视区域宽度
const w = document.body.clientWidth
const width = (w / 2 / w) * 100

// 列数  一行能放下几个
const column = Math.floor(100 / width)

const init = (list: any[]) => {
  heightList.value = []

  for (let i = 0; i < list.length; i++) {
    let item = list[i]

    // 先放下第一行的数据
    if (i < column) {
      waterList.push({
        ...item,
        left: i * width,
        top: 0
      })

      // 设置每一列当前的高度
      heightList.value.push(item.height)
    } else {
      let currentH = heightList.value[0]
      let index = 0 // 找到最小的高度的列

      heightList.value.forEach((h, i) => {
        if (currentH > h) {
          // currentH 就是 heightList.value[i]
          currentH = h
          index = i
        }
      })

      // console.log({ index, width, p: index % 2 === 0 ? 0 : 50 })

      // 把当前的元素放到最小高度的列中
      waterList.push({
        ...item,
        left: index % 2 === 0 ? 0 : 50,
        top: currentH + gapH
      })

      // 更新最小高度的列的高度
      heightList.value[index] = currentH + gapH + item.height
    }
  }
}

const currentH = computed<number>(() => {
  return heightList.value.length ? Math.max.apply(Math, heightList.value) : 0
})

const overlayRef = ref<InstanceType<typeof Overlay>>()

const handleShow: (type: number, src: string) => void = (type, src) => {
  overlayRef.value?.handleShow(type, src)
}

const PullRefreshRef = ref<InstanceType<typeof PullRefresh>>()
const refreshing = ref(false)
const onRefresh = () => {
  PullRefreshRef.value?.$el.scrollTo({
    top: 0,
    behavior: "smooth",
    duration: 500
  })

  setTimeout(() => {
    showToast("刷新成功")

    refreshing.value = false

    mylist.value = []
    waterList.length = 0

    mylist.value = [...getList(mylist.value.length, symbol.value as string)]
    init(mylist.value)

    if (mylist.value.length >= 50) {
      finished.value = true
    } else {
      finished.value = false
    }
  }, 1500)
}

const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  // console.log("onLoad")

  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    mylist.value = [
      ...mylist.value,
      ...getList(mylist.value.length, symbol.value as string)
    ]
    init(mylist.value)

    // 数据全部加载完成
    if (mylist.value.length >= 40) {
      finished.value = true
    }

    // 加载状态结束
    loading.value = false
  }, 1500)
}

onMounted(() => {
  mylist.value = [
    ...mylist.value,
    ...getList(mylist.value.length, symbol.value as string)
  ]
  init(mylist.value)

  if (mylist.value.length >= 50) {
    finished.value = true
  } else {
    finished.value = false
  }

  emitter.on("refresh", onRefresh)
})

onBeforeUnmount(() => {
  emitter.off("refresh", onRefresh)
})
</script>

<template>
  <div class="home bg-white py-2">
    <Overlay ref="overlayRef" />

    <van-pull-refresh
      ref="PullRefreshRef"
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        loading-text="加载中..."
        @load="onLoad"
      >
        <div class="wrap p-1 h-full" :style="{ height: currentH + 'px' }">
          <div
            v-for="(item, index) in waterList"
            :key="index"
            class="items rounded-md flex flex-col bg-white"
            :style="{
              height: item.height + 'px',
              left: item.left + 'vw',
              top: item.top + 'px'
              // background: item.background
            }"
            @click="handleShow(item.type, item.src)"
          >
            <div class="flex-1 relative overflow-hidden">
              <van-image
                class="w-full h-full"
                fit="cover"
                lazy-load
                :src="item.type === 0 ? item.src : item.poster"
              />

              <div
                v-if="item.type === 1"
                class="w-full h-full cursor-pointer bg-[rgba(0,0,0,0.3)] absolute top-0 left-0 bg-[url('@/assets/play.png')] bg-no-repeat bg-[length:4rem_4rem] bg-[center_center]"
              />
            </div>

            <div class="px-1 py-1 font-normal">
              <div class="ellipsis-2 text-sm font-bold">
                {{ item.title }}
              </div>
              <div class="text-sm my-[4] text-[12px]">
                {{ item.about }} --{{ item.left }}
              </div>
              <div class="flex justify-between items-center text-[12px]">
                <div class="flex items-center">
                  <van-icon name="contact" class="mt-[2px] mr-1" />
                  <div>{{ item.username }}</div>
                </div>
                <div class="flex items-center">
                  <van-icon name="good-job-o" class="mt-[2px] mr-1" />
                  <span>{{ item.zan }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  overflow: hidden;
  flex-direction: column;

  height: 100%;

  color: #212121;
  background: #f7f6f4;

  ::v-deep(.van-pull-refresh) {
    overflow: auto;
    flex: 1;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  ::v-deep(.van-list) {
    height: auto;
  }

  .wrap {
    position: relative;

    .items {
      position: absolute;

      width: calc(100vw / 2 - 2vw);
      margin: 0 1vw;

      font-weight: bold;
    }

    .ellipsis-2 {
      display: -webkit-box;
      overflow: hidden;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;

      text-overflow: ellipsis;

      -webkit-line-clamp: 2;
    }
  }
}
</style>
