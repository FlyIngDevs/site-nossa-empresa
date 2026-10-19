import { defineConfig } from "vite";

// const noAttr = () => {
//   return {
//     name: "no-attribute",
//     transformIndexHtml(html) {
//       return html.replace(`crossorigin`, "");
//     },
//   };
// };

export default defineConfig({
  // plugins: [noAttr()],
  server: {
    cors: {
      origin:
        /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|flyingmm\.com\.br|flyingdevs\.github\.io|\[::1\])(?::\d+)?$/,
    },
  },
});
