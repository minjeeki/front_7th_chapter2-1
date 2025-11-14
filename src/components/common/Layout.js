import { Header, Footer } from "./index.js";

export const Layout = (content, headerOptions) => {
  return /*html*/ `
    <div class="min-h-screen bg-gray-50">
      ${Header(headerOptions)}
      <main class="max-w-md mx-auto px-4 py-4">
          ${content}
      </main>
      ${Footer()}
      <div id="toast-container" class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 items-center" style="width: fit-content; pointer-events: none;">
      </div>
    </div>
  `;
};
