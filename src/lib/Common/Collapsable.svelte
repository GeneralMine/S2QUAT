<script>
	import DropDownIcon from './DropDownIcon.svelte';
	import Icon from './Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let expanded = false;
	export let title;
	export let add = false;
	export let edit = false;
	export let remove = false;
</script>

<div class="container">
	<div class="header">
		<div class="header head clickArea" on:click={() => (expanded = !expanded)}>
			<DropDownIcon {expanded} />
			<p class="title">{title}</p>
		</div>
		{#if expanded}
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
					<div class="delete button clickArea" on:click={() => dispatch('remove', {})}>
						<Icon name="delete" />
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<div class="content">
		{#if expanded}
			<slot />
		{/if}
	</div>
</div>

<style>
	.container {
		margin-top: 1rem;
		margin-bottom: 1rem;
		margin-left: 0rem;
		margin-right: 0rem;
		display: flex;
		flex-direction: column;
		-webkit-box-shadow: 1px 1px 3px 4px #ccc;
		-moz-box-shadow: 1px 1px 3px 4px #ccc;
		box-shadow: 1px 1px 3px 4px #ccc;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.title {
		font-weight: 600;
	}
	.head {
		justify-content: flex-start;
		flex: 1;
	}
	.buttons {
		flex-shrink: 1;
		display: flex;
		flex-direction: row;
		padding-right: 1rem;
	}
	.button {
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.content {
		padding-left: 1rem;
		padding-right: 1rem;
	}
</style>
