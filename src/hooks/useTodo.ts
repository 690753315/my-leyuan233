import { showFailToast } from "vant"

export function useTodo() {
  return () => {
    showFailToast({
      message: "该区域暂未开放，敬请期待"
    })
  }
}
