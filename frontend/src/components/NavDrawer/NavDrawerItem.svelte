<script>
    import { goto } from "@sapper/app";
    import { postData, getData, capitalizeFirstLetter } from "../../lib";
    import Icon from "../common/Icon.svelte";
    export let selected;
    export let title;
    export let url;
</script>

<a class="item" aria-current={selected === url.slice(1) ? "page" : undefined} href="javascript:void(0)" on:click={() => goto(url === "/dashboard" ? "/" : url)}>
    <div class="icon">
        <Icon {title} />
    </div>
    <span class="text">{capitalizeFirstLetter(title)}</span>
</a>

<style>
    .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        padding: 0 8px;
        /* margin: 8px; */
        text-decoration: none;
        height: 56px;
        line-height: 1.375rem;
        font-size: 0.95rem;
        font-weight: 500;
    }
    .item:hover {
        background-color: #2e5bff25;
    }
    .icon {
        margin-left: 8px;
        margin-right: 24px;
        width: 24px;
        height: 24px;
        line-height: 1;
    }
    .text {
        text-decoration: none;
        font-size: 0.95rem;
        line-height: 1.375rem;
        font-weight: 500;
        letter-spacing: 0.00714em;
        text-transform: inherit;
    }
    [aria-current] {
        background-color: #2e5bff25;
        color: #2e5bff;
        border-left: 4px solid #2e5bff;
    }
</style>
