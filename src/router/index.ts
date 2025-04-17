import { createRouter, createWebHashHistory } from "vue-router"
import Community from "@/views/community/Community.vue"
// import About from "../views/About.vue"
// import List from "../views/List.vue"
// import Detail from "../views/Detail.vue"

const routes = [
  {
    path: "/",
    component: Community
  }
  // {
  //   path: "/about",
  //   component: About
  // },
  // {
  //   path: "/list",
  //   component: List
  // },
  // {
  //   path: "/detail",
  //   component: Detail
  // }
]

const router = createRouter({
  history: createWebHashHistory("/my-leyuan233/"),
  routes
})

export default router
