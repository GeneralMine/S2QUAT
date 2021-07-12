<script>
	import TableFooter from './TableFooter.svelte';
	import TableHeader from './TableHeader.svelte';

	export let count;
	export let hasHeader = true;
	export let hasFooter = true;
</script>

<div class="tableContainer">
	{#if hasHeader}
		<TableHeader on:create on:search />
	{/if}
	<table class="table" cellspacing="0" cellpadding="0">
		<slot />
	</table>
	{#if hasFooter}
		<TableFooter {count} />
	{/if}
</div>

<style>
	.tableContainer {
		display: flex;
		flex-direction: column;
	}
</style>
