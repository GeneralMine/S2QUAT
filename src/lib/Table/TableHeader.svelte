<script>
	import DropDownButton from '$lib/Common/DropDownButton.svelte';
	import SearchBar from '$lib/Common/SearchBar.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let createButton;

	let value = '';

	function create() {
		dispatch('create', {});
	}
	function search() {
		dispatch('search', { value });
	}
</script>

<div class="tableHeader">
	<div class="tableHeaderFilter">
		<DropDownButton name="filter" />
	</div>
	<div class="tableHeaderSearch">
		<SearchBar bind:value on:change={search} />
	</div>
	<div class="tableHeaderCreate">
		{#if createButton}
			<button on:click={create}>Create</button>
		{/if}
	</div>
</div>

<style>
	.tableHeader {
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
		align-items: center;
		-webkit-box-align: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom-width: 1px;
		border-color: rgba(0, 0, 0, 0.5);
		line-height: 1.15;
	}
	.tableHeaderFilter {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}
	.tableHeaderSearch {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		flex: 1;
	}
	.tableHeaderCreate {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}
</style>
