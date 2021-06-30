<script>
	export let expanded = false;
</script>

<button on:click={() => (expanded = !expanded)}
	>Marvin denkt sich hier noch einen tollen Button aus!</button
>

<div class="container">
	{#if expanded}
		<slot />
	{/if}
</div>

<style>
	.container {
		padding-left: 1rem;
	}
</style>
