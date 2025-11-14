import { Layout } from "./components/common";
import { ItemListPage, ItemDetailPage, NotFoundPage } from "./pages";
import { CartDialog, initCartDialog, initCartStorage } from "./components/cart/CartDialog.js";
import { initAddToCartButtons } from "./components/cart/addToCartBtn.js";
import { router } from "./router.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

// 페이지 렌더링 함수
function renderPage(page) {
  const root = document.getElementById("root");
  if (!root) throw new Error("`#root` 요소를 찾을 수 없습니다.");

  root.innerHTML = Layout(page.content, page.headerOptions);

  // CartDialog 모달이 아직 없으면 body에 추가
  let modalOverlay = document.getElementById("cart-modal-overlay");
  if (!modalOverlay) {
    const cartDialogHTML = CartDialog();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cartDialogHTML;
    document.body.appendChild(tempDiv.firstElementChild);
  }

  // CartDialog 초기화 (Header가 렌더링된 후)
  initCartDialog();

  // 장바구니 담기 버튼 이벤트 리스너 등록
  initAddToCartButtons();

  // 페이지 초기화 (카테고리 로딩 등)
  if (page.init) {
    page.init();
  }
}

// 상품 목록 클릭 이벤트 핸들러 설정
function setupProductClickHandlers() {
  // 이벤트 위임: product-card, product-info 클릭 처리
  document.addEventListener("click", (event) => {
    const productCard = event.target.closest(".product-card");
    const productInfo = event.target.closest(".product-info");
    const productImage = event.target.closest(".product-image");
    const relatedProductCard = event.target.closest(".related-product-card");

    if (productCard) {
      const productId = productCard.getAttribute("data-product-id");
      if (productId) {
        router.navigate(`/product/${productId}`);
      }
    } else if (productInfo) {
      const productCard = productInfo.closest(".product-card");
      if (productCard) {
        const productId = productCard.getAttribute("data-product-id");
        if (productId) {
          router.navigate(`/product/${productId}`);
        }
      }
    } else if (productImage) {
      const productCard = productImage.closest(".product-card");
      if (productCard) {
        const productId = productCard.getAttribute("data-product-id");
        if (productId) {
          router.navigate(`/product/${productId}`);
        }
      }
    } else if (relatedProductCard) {
      const productId = relatedProductCard.getAttribute("data-product-id");
      if (productId) {
        router.navigate(`/product/${productId}`);
      }
    }

    // 상품 목록으로 돌아가기 버튼
    const goToProductListBtn = event.target.closest(".go-to-product-list");
    if (goToProductListBtn) {
      router.navigate("/");
    }

    // 브레드크럼 카테고리 링크 클릭 처리
    const breadcrumbLink = event.target.closest(".breadcrumb-link");
    if (breadcrumbLink) {
      const category1 = breadcrumbLink.getAttribute("data-category1");
      const category2 = breadcrumbLink.getAttribute("data-category2");
      if (category1 || category2) {
        const query = {};
        if (category1) query.category1 = category1;
        if (category2) query.category2 = category2;
        const queryString = router.buildQueryString(query);
        router.navigate(`/${queryString}`);
      } else {
        router.navigate("/");
      }
    }
  });
}

function main() {
  const root = document.getElementById("root");
  if (!root) throw new Error("`#root` 요소를 찾을 수 없습니다.");

  // localStorage 초기화
  initCartStorage();

  // 라우트 등록
  router.addRoute("/", ({ query }) => {
    const page = ItemListPage(query);
    renderPage(page);
  });

  router.addRoute("/product/:id", ({ params }) => {
    const page = ItemDetailPage(params.id);
    renderPage(page);
  });

  // 404 핸들러
  router.setNotFoundHandler(() => {
    const page = NotFoundPage();
    renderPage(page);
  });

  // 상품 클릭 이벤트 핸들러 설정
  setupProductClickHandlers();

  // 라우터 초기화
  router.init();
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
