<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue"

import Overlay from "@/components/Overlay.vue"

const list = [
  {
    height: 200,
    background: "red"
  },
  {
    height: 230,
    background: "pink"
  },
  {
    height: 250,
    background: "blue"
  },
  {
    height: 300,
    background: "pink"
  },
  {
    height: 280,
    background: "black"
  },
  // -------------------------------
  {
    height: 200,
    background: "deeppink"
  },
  {
    height: 230,
    background: "brown"
  },
  {
    height: 250,
    background: "skyblue"
  },
  {
    height: 300,
    background: "green"
  },
  {
    height: 280,
    background: "orange"
  },
  // -------------------------------
  {
    height: 300,
    background: "red"
  },
  {
    height: 250,
    background: "pink"
  },
  // -------------------------------
  {
    height: 400,
    background: "blue"
  },
  {
    height: 100,
    background: "pink"
  },
  {
    height: 50,
    background: "black"
  },
  // -------------------------------
  {
    height: 200,
    background: "deeppink"
  },
  {
    height: 300,
    background: "brown"
  },
  {
    height: 400,
    background: "skyblue"
  },
  {
    height: 100,
    background: "green"
  },
  {
    height: 50,
    background: "orange"
  }
  // -------------------------------
]

const waterList = reactive<any[]>([])

// 维护每一列的高度的数组
const heightList: number[] = []

let gapH = 6 // 间距

const init = () => {
  // 可视区域宽度
  const w = document.body.clientWidth

  const width = w / 2 - 5

  // 列数   一行能放下几个
  const column = Math.floor(w / width)

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
      heightList.push(item.height)
    } else {
      let currentH = heightList[0]
      let index = 0

      // 找到最小的高度的列
      heightList.forEach((h, i) => {
        if (currentH > h) {
          // currentH 就是 heightList[i]
          currentH = h
          index = i
        }
      })

      // 把当前的元素放到最小高度的列中
      waterList.push({
        ...item,
        left: index * width,
        top: currentH + gapH
      })

      // 更新最小高度的列的高度
      heightList[index] = currentH + item.height + gapH
    }
  }
}

onMounted(() => {
  init()
})

const overlayRef = ref<InstanceType<typeof Overlay>>()

const handleShow: (type: number, src: string) => void = (type, src) => {
  overlayRef.value?.handleShow(type, src)
}
</script>

<template>
  <div class="home bg-white py-2">
    <Overlay ref="overlayRef" />

    <div class="wrap p-1 h-full">
      <div
        v-for="(item, index) in waterList"
        :key="index"
        class="items rounded-md flex flex-col"
        :style="{
          height: item.height + 'px',
          left: item.left + 'px',
          top: item.top + 'px',
          background: item.background
        }"
      >
        <img
          class="flex-1"
          src="@/assets/1.png"
          @click="
            handleShow(
              0,
              'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
            )
          "
        />
        <div class="px-2 py-1">
          <div class="ellipsis-2 text-sm">
            【新英雄预告】法术机关枪！符文法师
            瑞兹上线体验服~Faker×瑞兹联动表情包来了！
          </div>
          <div class="text-sm my-[4] text-[12px]">英雄联盟</div>
          <div class="flex justify-between items-center text-[12px]">
            <div>用户名</div>
            <div class="flex items-center">
              <van-icon name="good-job-o" />
              {{ 10 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  position: relative;

  .items {
    position: absolute;

    width: calc(100vw / 2 - 10px);
    margin: 0 5px;

    font-weight: bold;

    color: #fff;
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
</style>
