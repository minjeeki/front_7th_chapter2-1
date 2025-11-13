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
