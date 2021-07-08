<script>
	import Icon from './Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let title;
	export let padding = false;
	export let clickArea = false;
	export let smallTitle = false;
</script>

<div class="surfaceContainer">
	<div class="surfaceHeader">
		{#if title}
			<h1 class="surfaceHeaderTitle" class:clickArea class:smallTitle on:click>{title}</h1>
		{/if}
		<slot name="header" />
	</div>
	<div class:padding class="surfaceContent">
		<slot />
	</div>
</div>

<style>
	.surfaceContainer {
		display: flex;
		flex-direction: column;
	}
	.surfaceHeader {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.67em;
	}
	.surfaceHeaderTitle {
		margin: 0;
	}
	.smallTitle {
		font-size: 18px;
	}
	.surfaceContent {
		border-width: 1px;
		border-color: #2e5bff;
		border-radius: 12px;
		margin-bottom: 1em;
		margin-left: 1em;
		margin-right: 1em;
		background-color: var(--surface-color);
	}
	.padding {
		padding: 2rem;
	}
</style>
