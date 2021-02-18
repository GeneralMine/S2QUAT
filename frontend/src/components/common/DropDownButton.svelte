<script>
    import Icon from "./Icon.svelte";
    import DropDownIcon from "./DropDownIcon.svelte";

    export let title;
</script>

<div class="container">
    <div class="icon">
        <Icon {title} />
    </div>
    <div class="dropdownicon">
        <DropDownIcon />
    </div>
</div>

<style>
    .container {
        align-items: center;
        display: flex;
        flex-direction: row;
        background-color: #e9e9e9;
        border-radius: 0.5rem;
    }
    .icon {
        width: 30px;
        height: 30px;
        padding-right: 0;
    }
    .dropdownicon {
        width: 30px;
        height: 30px;
        padding-left: 0;
    }
</style>
