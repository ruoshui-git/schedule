import {
    addMessages,
    getLocaleFromNavigator,
    init,
    register,
} from "svelte-i18n";

import en from "./en.json";
import zhHans from "./zh-Hans.json";
export default () => {
    //   register("en", () => import("./e n.json"));
    //   register("zh-Hans", () => import("./zh-HANS.json"));
    // console.log("loading locale");
    // addMessages("en", en);
    addMessages("zh-Hans", zhHans);

    init({
        fallbackLocale: "zh-Hans",
        initialLocale: getLocaleFromNavigator(),
    });
};
