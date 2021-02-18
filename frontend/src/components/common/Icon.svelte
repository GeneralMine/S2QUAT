<script>
    export let title;
    export let url = title;
    export let alt = title + " icon";
    export let visibility = "visible";

    const icon_url = "/icons/";
    const icon_format = ".svg";
    $: url = title;
    $: src = icon_url + url + icon_format;
    let mounted = true;
</script>

{#if mounted}<img {src} {alt} style="visibility: {visibility};" />{/if}

<style>
    img {
        opacity: 0.6;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        align-self: center;
        object-fit: contain;
    }
</style>
