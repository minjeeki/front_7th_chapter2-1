import { Header, Footer } from "./index.js";

export const Layout = (content, headerOptions) => {
  return `
    <div class="min-h-screen bg-gray-50">
        ${Header(headerOptions)}
        <main class="max-w-md mx-auto px-4 py-4">
            ${content}
        </main>
        ${Footer()}
    </div>
  `;
};
