<script>
    export let name;
    export let value;

    const options = ["male", "female", "divers"];
</script>

<select bind:value {name}>
    {#each options as o}
        <option>{o}</option>
    {/each}
</select>

<style>
    select {
        width: 100%;
        height: 100%;
    }
</style>
