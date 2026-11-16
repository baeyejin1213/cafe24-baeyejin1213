/* mplugin_tab v1.0 */
/* morenvy.com */
/* developer : nullptr */
/* created : 2026.01 */
/* desc : Responsive slide tabs, scroll movement behavior plugin */

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // mall_script/mplugin_tab.ts
  var MPlugin_Tab = class {
    constructor() {
      // 스와이퍼 클래스
      __publicField(this, "swiperClass", "");
      // 탭 버튼 쿼리
      __publicField(this, "tabBtnQuery", "");
      // 탭 섹션 쿼리
      __publicField(this, "tabSectionQuery", "");
      // 섹션 스크롤 이동 시간
      __publicField(this, "scrollDuration", 500);
      // 섹션 스크롤 오프셋
      __publicField(this, "scrollOffset", 0);
      // 스와이퍼
      __publicField(this, "swiper");
      var _a, _b, _c;
      const metaElem = document.querySelector("meta#mplugin_tab");
      if (!metaElem) {
        console.warn(`모렌비 탭 플러그인 - <meta id="mplugin_tab">가 없습니다.`);
        return;
      }
      this.swiperClass = (_a = metaElem.getAttribute("data-swiper-class")) != null ? _a : "";
      this.tabBtnQuery = (_b = metaElem.getAttribute("data-tab-btn")) != null ? _b : "";
      this.tabSectionQuery = (_c = metaElem.getAttribute("data-section")) != null ? _c : "";
      if (!this.swiperClass || !this.tabBtnQuery || !this.tabSectionQuery) {
        console.warn(`모렌비 탭 플러그인 - 메타 데이터에 설정된 데이터가 없습니다.`);
        return;
      }
      const duration = Number(metaElem.getAttribute("data-scroll-duration"));
      if (duration) this.scrollDuration = duration;
      const offset = Number(metaElem.getAttribute("data-scroll-offset"));
      if (offset) {
        if (window.innerWidth <= 767) this.scrollOffset = 120;
        else this.scrollOffset = offset;
      };
      this.swiper = new Swiper(
        this.swiperClass,
        {
          slidesPerView: "auto",
          spaceBetween: 0,
          loop: false,
          watchOverflow: true,
          observer: true,
          observeParents: true,
          speed: 700
        }
      );
      const anchors = document.querySelectorAll(this.tabBtnQuery);
      anchors.forEach((anchor) => anchor.addEventListener("click", (e) => this.clickTab(e)));
      window.addEventListener("scroll", (e) => this.highlightTab());
      this.highlightTab();
    }
    // 탭 클릭 이벤트
    clickTab(e) {
      e.preventDefault();
      const elem = e.target;
      const targetId = elem.href.split("#")[1];
      const target = document.getElementById(targetId);
      if (!target) return;
      const startY = window.scrollY;
      let startTime = 0;
      const tick = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const deltaTime = timestamp - startTime;
        const targetY = target.getBoundingClientRect().top + window.scrollY - this.scrollOffset;
        const alpha = Math.min(deltaTime / this.scrollDuration, 1);
        const easeOutQuad = (t) => t * (2 - t);
        const nextY = startY + (targetY - startY) * easeOutQuad(alpha);
        window.scrollTo(window.scrollX, nextY);
        if (alpha < 1) window.requestAnimationFrame(tick);
        else if (!this.scrollOffset) target.scrollIntoView({ behavior: "smooth" });
      };
      window.requestAnimationFrame(tick);
    }
    // 탭 하이라이트
    highlightTab() {
      let mostVisibleElem;
      let prevRatio = 0;
      const sections = document.querySelectorAll(this.tabSectionQuery);
      sections.forEach((elem) => {
        const rect = elem.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibleRatio = visibleHeight / rect.height;
        if (prevRatio < visibleRatio) {
          prevRatio = visibleRatio;
          mostVisibleElem = elem;
        }
      });
      if (!mostVisibleElem) return;
      const anchors = document.querySelectorAll(this.tabBtnQuery);
      if (!anchors) return;
      anchors.forEach((anchor, i) => {
        const targetId = anchor.href.split("#")[1];
        if ((mostVisibleElem == null ? void 0 : mostVisibleElem.id) === targetId) {
          if (!anchor.classList.contains("active")) {
            this.swiper.slideTo(i);
            anchor.classList.add("active");
          }
        } else {
          if (anchor.classList.contains("active")) anchor.classList.remove("active");
        }
      });
    }
  };
  window.addEventListener("DOMContentLoaded", async () => {
    const mtab = new MPlugin_Tab();
  });
})();
