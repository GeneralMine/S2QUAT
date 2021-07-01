<script>
	import TableFooter from './TableFooter.svelte';
	import TableHeader from './TableHeader.svelte';
</script>

<div class="tableContainer">
	<TableHeader />
	<table class="table" cellspacing="0" cellpadding="0">
		<slot />
	</table>
	<TableFooter />
</div>

<style>
	.tableContainer {
		display: flex;
		flex-direction: column;
	}
</style>
