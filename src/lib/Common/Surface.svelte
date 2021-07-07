<script>
	import Icon from './Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let title;
	export let add = false;
	export let edit = false;
	export let remove = false;
	export let padding = false;
	export let clickArea = false;
	export let smallTitle = false;
</script>

<div class="surfaceContainer">
	<div class="surfaceHeader">
		{#if title}
			<h1 class="surfaceHeaderTitle" class:clickArea class:smallTitle on:click>{title}</h1>
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
	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-right: 2rem;
		padding-left: 3rem;
	}
	.button {
		margin-right: 1rem;
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.padding {
		padding: 2rem;
	}
</style>
