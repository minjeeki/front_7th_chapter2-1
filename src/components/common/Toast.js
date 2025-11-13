// 메시지 케이스
//   success : "장바구니에 추가되었습니다",
//   info : "선택된 상품들이 삭제되었습니다",
//   error: "오류가 발생했습니다",
// ];

const TOAST_CONFIG = {
  success: {
    bgColor: "bg-green-600",
    icon: "M5 13l4 4L19 7",
  },
  info: {
    bgColor: "bg-blue-600",
    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  error: {
    bgColor: "bg-red-600",
    icon: "M6 18L18 6M6 6l12 12",
  },
};

export const Toast = ({ type, message }) => {
  const { bgColor, icon } = TOAST_CONFIG[type];

  return /*html*/ `
    <div class="${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
      <div class="flex-shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}"></path>
        </svg>
      </div>
      <p class="text-sm font-medium">${message}</p>
      <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;
};

// Toast 메시지 표시 함수
export const showToast = (message, type = "success") => {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    console.warn("toast-container를 찾을 수 없습니다.");
    return;
  }

  const toastHTML = Toast({ type, message });
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = toastHTML;
  const toastElement = tempDiv.firstElementChild;

  // pointer-events를 다시 활성화
  toastElement.style.pointerEvents = "auto";
  // 초기 opacity 설정 및 애니메이션
  toastElement.style.opacity = "0";
  toastElement.style.transition = "opacity 0.3s ease-in-out";

  toastContainer.appendChild(toastElement);

  // 다음 프레임에서 opacity를 1로 변경하여 페이드인 효과
  requestAnimationFrame(() => {
    toastElement.style.opacity = "1";
  });

  // 3초 후 자동 제거
  setTimeout(() => {
    if (toastElement && toastElement.parentNode) {
      toastElement.style.opacity = "0";
      toastElement.style.transition = "opacity 0.3s";
      setTimeout(() => {
        if (toastElement.parentNode) {
          toastElement.parentNode.removeChild(toastElement);
        }
      }, 300);
    }
  }, 3000);

  // 닫기 버튼 이벤트
  const closeBtn = toastElement.querySelector("#toast-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      toastElement.style.opacity = "0";
      toastElement.style.transition = "opacity 0.3s";
      setTimeout(() => {
        if (toastElement.parentNode) {
          toastElement.parentNode.removeChild(toastElement);
        }
      }, 300);
    });
  }
};
