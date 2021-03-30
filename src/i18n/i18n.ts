import { getLocaleFromNavigator, init, register } from "svelte-i18n";

register("en-US", () => import("./en-US.json"));
register("zh-Hans", () => import("./zh-HANS.json"));

init({
  fallbackLocale: "zh-Hans",
  initialLocale: getLocaleFromNavigator(),
});
