import { useEventListener } from "@vueuse/core";

export function titleChange() {
  // 动态标题
  let OriginTitile: string = document.title;
  let titleTime: NodeJS.Timeout;
  useEventListener(document, "visibilitychange", () => {
    if (document.hidden) {
      //离开当前页面时标签显示内容
      document.title = "（＞人＜；）再来看看嘛~";
      clearTimeout(titleTime);
    } else {
      //返回当前页面时标签显示内容
      document.title = "我就知道你还会来的~";
      //5秒后变回正常标题
      titleTime = setTimeout(() => {
        document.title = OriginTitile;
      }, 5000);
    }
  });
}