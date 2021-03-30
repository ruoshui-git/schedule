<script lang="typescript">
    import { locale, locales, _ } from "svelte-i18n";
</script>

<div>
    {$_("choose-a-language")}:
    <select bind:value={$locale}>
        {#each $locales as locale}
            <option value={locale}
                >{locale === "zh-Hans"
                    ? "中文"
                    : locale === "en"
                    ? "English"
                    : locale}</option
            >
        {/each}
    </select>
</div>
