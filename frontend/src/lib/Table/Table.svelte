<script>
	import TableOptions from './TableOptions.svelte';
</script>

<div class="tableContainer">
	<TableOptions />
	<table class="table" cellspacing="0" cellpadding="0">
		<slot />
	</table>
</div>

<style>
	.tableContainer {
		display: flex;
		flex-direction: column;
	}
</style>
