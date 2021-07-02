<script>
	import TableFooter from './TableFooter.svelte';
	import TableHeader from './TableHeader.svelte';

	export let count = null;
	export let hasHeader = true;
</script>

<div class="tableContainer">
	{#if hasHeader}
		<TableHeader />
	{/if}
	<table class="table" cellspacing="0" cellpadding="0">
		<slot />
	</table>
	{#if count}
		<TableFooter />
	{/if}
</div>

<style>
	.tableContainer {
		display: flex;
		flex-direction: column;
	}
</style>
