import { Header, Footer } from "./index.js";

export const Layout = (content, headerOptions) => {
  return /*html*/ `
    <div class="min-h-screen bg-gray-50">
        ${Header(headerOptions)}
        <main class="max-w-md mx-auto px-4 py-4">
            ${content}
        </main>
        ${Footer()}
        <div id="toast-container" class="flex flex-col gap-2 items-center justify-center mx-auto" style="width: fit-content;">
        </div>
    </div>
  `;
};
