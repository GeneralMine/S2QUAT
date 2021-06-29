<script>
	export let title;
</script>

{#if title}
	<h1>{title}</h1>
{/if}
<div class="surfaceContainer">
	<slot />
</div>

<style>
	.surfaceContainer {
		border-width: 1px;
		border-color: #2e5bff;
		margin: 1em;
		border-radius: 12px;
		background-color: var(--surface-color);
	}
</style>
