import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import Components from "unplugin-vue-components/vite"
import { VantResolver } from "unplugin-vue-components/resolvers"

import { createHtmlPlugin } from "vite-plugin-html"

// import fs from "node:fs"

// const myPlugin = () => {
//   return {
//     name: "my-plugin",
//     transformIndexHtml() {
//       const data = {
//         name: "John",
//         age: 30,
//         city: "New York"
//       }

//       // 使用fs.writeFile方法生成一个空的json文件
//       fs.writeFile("./dist/file.json", JSON.stringify(data), (err) => {
//         if (err) throw err
//       })
//     }
//   }
// }

// https://vite.dev/config/
export default defineConfig({
  base: "/my-leyuan233/",
  plugins: [
    // myPlugin(),

    vue(),
    Components({
      resolvers: [VantResolver()]
    }),

    // 1. 使用createHtmlPlugin直接注入参数
    // 2. 定义myPlugin生成json文件
    // 3. 定义myPlugin，读取html的内容，插入版本号信息，生成新的内容返回
    // @ts-ignore
    createHtmlPlugin({
      /**
       * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
       * @default
       */
      minify: true,
      /**
       * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
       * @default src/main.ts
       */
      // entry: "src/main.ts",
      /**
       * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
       * @default index.html
       */
      template: "./index.html",
      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: "index",
          injectScript: `<script src="./inject.js"></script>`
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  }
})
