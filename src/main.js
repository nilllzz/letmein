import { createApp, reactive } from "vue";
import App from "./App.vue";

console.debug("Hello, World!");
createApp(App).mount("#app");

export const isDevelopment = process.env.NODE_ENV === "development";

export const mousePosition = reactive({ x: 0, y: 0 });
