export default class ShortsToWatch {
  name: string = "ShortsToWatch";
  author: string = "Giwon";
  css_style: string = `
    #stw-button {
      border: none;
      outline: none;
      color: white;
      background-color: #272727;
      width: 56px;
      height: 56px;
      border-radius: 50%;
  }

  #stw-button:hover, #stw-button.focus, #stw-button:active {
      background-color: #535353;
      cursor: pointer;
  }

  #stw-button::before {
      content: attr(data-tooltip);
      position: absolute;
      left: -116px;
      top: 50%;
      transform: translateY(-50%);
      width: fit-content;
      padding: 10px 10px;
      background-color: #595959;
      color: #fff;
      font-size: 12px;
      text-wrap: nowrap;
      text-align: right;
      border-radius: 5px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  #stw-button:hover::before {
      opacity: 1;
      visibility: visible;
  }`;

  start() {
    function getElementByXpath(path: string) {
      return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
    }

    const createSTW = () => {
      // 버튼 요소 생성
      var parent = document.createElement("div");
      parent.classList.add("navigation-button", "style-scope", "ytd-shorts");
      parent.id = "navigation-button-stw";

      var button = document.createElement("button");
      button = document.createElement("button");
      button.id = "stw-button";
      button.innerText = "STW";
      button.setAttribute("data-tooltip", "일반 동영상으로 전환");

      parent.appendChild(button);

      // 클릭 이벤트 추가
      button.addEventListener("click", () => {
        var video_id = window.location.href.split("shorts/")[1];
        const videoElement = getElementByXpath(
          '//*[@id="shorts-player"]/div[1]/video'
        ) as HTMLVideoElement;
        if (videoElement) {
          videoElement.pause();
        }
        window.open(`https://www.youtube.com/watch?v=${video_id}`);
      });

      // 버튼 요소 반환
      return parent;
    };

    const button = createSTW();
    const target_selector_to_add_button =
      "#page-manager > ytd-shorts > div.navigation-container.style-scope.ytd-shorts";

    const is_it_shorts = () => {
      console.info("URL changed to:", window.location.href);

      // 쇼츠 페이지에 접속 했다면
      if (window.location.href.includes("/shorts/")) {
        var targetDiv = document.querySelector(target_selector_to_add_button);

        // 버튼이 없다면 생성
        if (targetDiv && !targetDiv.contains(button)) {
          // alert('버튼 생성함');
          targetDiv.insertBefore(button, targetDiv.children[1]);
        }
        // 버튼 보이기
        button.classList.toggle("show", true);
        // 쇼츠 페이지가 아니라면
      } else {
        // 버튼 숨기기
        if (button) {
          button.classList.toggle("show", false);
        }
      }
    };

    var currentURL = "https://google.com";

    setInterval(() => {
      if (currentURL !== window.location.href) {
        console.log("[STW] URL 변경 감지", window.location.href);

        is_it_shorts();

        // 현재 URL 갱신
        currentURL = window.location.href;
      }
    }, 3000);

    // 탭 전환 이벤트
    document.addEventListener("visibilitychange", function () {
      // 쇼츠 페이지일 때
      if (window.location.href.includes("/shorts/")) {
        if (document.visibilityState === "visible") {
          // 탭으로 돌아왔을 때
          document.title = document.title.replace("[Pause] ", "");
          const videoElement = getElementByXpath(
            '//*[@id="shorts-player"]/div[1]/video'
          ) as HTMLVideoElement;
          if (videoElement) {
            videoElement.play();
          }
        } else {
          // 탭을 나갔을 때
          document.title = "[Pause] " + document.title;
          (
            getElementByXpath(
              '//*[@id="shorts-player"]/div[1]/video'
            ) as HTMLVideoElement
          ).pause();
        }
      }
    });
  }
}
