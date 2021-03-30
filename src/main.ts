import App from "./App.svelte";
import i18n from "./i18n/i18n";
i18n();

const app = new App({
    target: document.body,
});

export default app;
