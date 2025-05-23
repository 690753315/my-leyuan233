import { createApp } from "vue"
import "./styles/index.css"

import App from "./App.vue"
import router from "@/router" // 引入刚才创建的路由规则
import { Lazyload } from "vant"
import { Toast } from "vant"
import "vant/lib/toast/style"

const app = createApp(App)
app.use(Lazyload).use(Toast)
app.use(router) // 一定要在挂载之前使用这个规则
app.mount("#app")
