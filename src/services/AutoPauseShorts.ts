import GetElementByXpath from "../util/GetElementByXpath";

export default class AutoPauseShorts {
  name: string = "Auto Pause Shorts";
  author: string = "Giwon";

  start() {
    // 탭 전환 이벤트
    document.addEventListener("visibilitychange", function () {
      // 쇼츠 페이지일 때
      if (window.location.href.includes("/shorts/")) {
        if (document.visibilityState === "visible") {
          // 탭으로 돌아왔을 때
          document.title = document.title.replace("[Pause] ", "");
          const videoElement = GetElementByXpath(
            '//*[@id="shorts-player"]/div[1]/video'
          ) as HTMLVideoElement;
          if (videoElement) {
            videoElement.play();
          }
        } else {
          // 탭을 나갔을 때
          document.title = "[Pause] " + document.title;
          (
            GetElementByXpath(
              '//*[@id="shorts-player"]/div[1]/video'
            ) as HTMLVideoElement
          ).pause();
        }
      }
    });
  }
}
