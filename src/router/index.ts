import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    component: () => import("@/views/community/Community.vue")
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue")
  },
  {
    path: "/:pathMatch(.*)*", // 匹配所有未识别的路径
    name: "NotFound",
    redirect: "/404"
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
  history: createWebHistory("/my-leyuan233/"),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  const { path, query } = to

  if (path === "/") {
    if (!query.symbol) {
      next({
        ...to,
        query: {
          ...query,
          symbol: "1"
        },
        replace: true
      })
      return
    }
  }

  next()
})

export default router
