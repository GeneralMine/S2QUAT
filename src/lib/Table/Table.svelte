<script>
	import TableFooter from './TableFooter.svelte';
	import TableHeader from './TableHeader.svelte';

	export let count;
	export let limit = 15;
	export let hasHeader = true;
	export let hasFooter = true;
	export let createButton = false;
</script>

<div class="tableContainer">
	{#if hasHeader}
		<TableHeader {createButton} on:create on:search />
	{/if}
	<table class="table" cellspacing="0" cellpadding="0">
		<slot />
	</table>
	{#if hasFooter}
		<TableFooter {count} {limit} />
	{/if}
</div>

<style>
	.tableContainer {
		display: flex;
		flex-direction: column;
	}
</style>
