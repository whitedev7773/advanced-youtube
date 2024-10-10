// ./services 에서 생성한 서비스 파일을 불러옵니다.
import ShortsToWatch from "./services/ShortsToWatch";
import AutoPauseShorts from "./services/AutoPauseShorts";

namespace App {
  // 서비스 인터페이스 정의 (선택 사항)
  interface Service {
    name: string;
    author: string;
    start: () => void;
    css_style?: string;
  }

  // 서비스 로딩
  const Services: Service[] = [new ShortsToWatch(), new AutoPauseShorts()];

  // 서비스 시작
  Services.forEach((service, index) => {
    // .name이 없다면 경고
    if (!("name" in service) || typeof service.name !== "string") {
      console.warn(`서비스[${index}]는/은 이름이 정의되지 않았습니다.`);
    }
    // .author가 없다면 경고
    if (!("author" in service) || typeof service.author !== "string") {
      console.warn(`서비스[${index}]는/은 개발자가 알려지지 않았습니다.`);
    }

    // css_style이 있으면 적용
    if ("css_style" in service && typeof service.css_style === "string") {
      const style = document.createElement("style");
      style.innerHTML = service.css_style;
      document.head.appendChild(style);
      console.info(
        `서비스[${index}] '${service.name ?? "무제"} by. ${
          service.author ?? "알 수 없음"
        }'의 CSS-Style을 적용했습니다.`
      );
    }

    // .start가 없다면 그 서비스는 실행 X
    if (typeof service.start === "function") {
      service.start();
      console.info(
        `서비스[${index}] '${service.name ?? "무제"} by. ${
          service.author ?? "알 수 없음"
        }'를 활성했습니다.`
      );
    } else {
      console.error(
        `서비스[${index}] '${service.name ?? "무제"}'는 시작 함수가 없습니다:`,
        service
      );
    }
  });
}
