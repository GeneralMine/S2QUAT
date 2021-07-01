<script>
	import Icon from './Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let title;
	export let add = false;
	export let edit = false;
	export let remove = false;
</script>

<div class="header">
	{#if title}
		<h1>{title}</h1>
	{/if}
	{#if add || edit || remove}
		<div class="buttons">
			{#if add}
				<div class="add button clickArea" on:click={() => dispatch('add', {})}>
					<Icon name="add" />
				</div>
			{/if}
			{#if edit}
				<div class="edit button clickArea" on:click={() => dispatch('edit', {})}>
					<Icon name="edit" />
				</div>
			{/if}
			{#if remove}
				<div class="delete button clickArea" on:click={() => dispatch('delete', {})}>
					<Icon name="delete" />
				</div>
			{/if}
		</div>
	{/if}
</div>
<div class="surfaceContainer">
	<slot />
</div>

<style>
	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.surfaceContainer {
		border-width: 1px;
		border-color: #2e5bff;
		margin-bottom: 1em;
		margin-left: 1em;
		margin-right: 1em;
		border-radius: 12px;
		background-color: var(--surface-color);
	}
	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-right: 3rem;
	}
	.button {
		margin-right: 1rem;
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
