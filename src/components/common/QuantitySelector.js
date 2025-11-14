// 수량 선택 컴포넌트
export const QuantitySelector = (quantityOrOptions = 1, options = {}) => {
  // 첫 번째 인자가 숫자면 quantity, 객체면 options
  let quantity = 1;
  let opts = {};

  if (typeof quantityOrOptions === "number") {
    quantity = quantityOrOptions;
    opts = options;
  } else {
    opts = quantityOrOptions;
  }

  const {
    max = null,
    size = "default", // "default" | "small"
    showLabel = true,
    idPrefix = "quantity",
    productId = null, // CartDialog용
  } = opts;

  const isSmall = size === "small";
  const buttonSize = isSmall ? "w-7 h-7" : "w-8 h-8";
  const inputSize = isSmall ? "w-12 h-7" : "w-16 h-8";
  const iconSize = isSmall ? "w-3 h-3" : "w-4 h-4";
  const maxAttr = max ? `max="${max}"` : "";
  const dataProductId = productId ? `data-product-id="${productId}"` : "";

  return /*html*/ `
    ${showLabel ? `<div class="flex items-center justify-between mb-4">` : ""}
      ${showLabel ? `<span class="text-sm font-medium text-gray-900">수량</span>` : ""}
      <div class="flex items-center ${showLabel ? "" : "w-full justify-end"}">
        <button 
          id="${idPrefix}-decrease" 
          class="${buttonSize} flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 ${productId ? "quantity-decrease-btn" : ""}"
          ${dataProductId}
        >
          <svg class="${iconSize}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
        </button>
        <input 
          type="number" 
          id="${idPrefix}-input" 
          value="${quantity}" 
          min="1" 
          ${maxAttr}
          class="${inputSize} text-center text-sm border-t border-b border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${productId ? "quantity-input" : ""}"
          ${productId ? "disabled" : ""}
          ${dataProductId}
        >
        <button 
          id="${idPrefix}-increase" 
          class="${buttonSize} flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 ${productId ? "quantity-increase-btn" : ""}"
          ${dataProductId}
        >
          <svg class="${iconSize}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
    ${showLabel ? `</div>` : ""}
  `;
};
