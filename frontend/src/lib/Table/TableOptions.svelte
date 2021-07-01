<script>
	import DropDownButton from '$lib/Common/DropDownButton.svelte';
	import SearchBar from '$lib/Common/SearchBar.svelte';
</script>

<div class="tableOptions">
	<div class="tableOptionsFilter">
		<DropDownButton name="filter" />
	</div>
	<div class="tableOptionsSearch">
		<SearchBar />
	</div>
	<div class="tableOptionsCreate">
		<button> Create </button>
	</div>
</div>

<style>
	.tableOptions {
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
	.tableOptionsFilter {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}
	.tableOptionsSearch {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		flex: 1;
	}
	.tableOptionsCreate {
		flex-shrink: 0;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}
</style>
