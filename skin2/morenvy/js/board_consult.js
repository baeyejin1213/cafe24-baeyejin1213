document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".txtNum");
  items.forEach((item) => {
    const text = item.textContent.trim();
    let divClass = "";
    let displayText = "";
    if (text === "O") {
      divClass = "icon_ok";
      displayText = "답변완료";
    } else if (text === "X") {
      divClass = "icon_no";
      displayText = "답변대기";
    }
    if (divClass) {
      const div = document.createElement("div");
      div.classList.add(divClass);
      div.textContent = displayText; // 여기서 텍스트 변경됨
      item.textContent = ""; // 기존 텍스트 제거
      item.appendChild(div); // 새 div 삽입
    }
  });
});