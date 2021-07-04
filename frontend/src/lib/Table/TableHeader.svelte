<script>
	import DropDownButton from '$lib/Common/DropDownButton.svelte';
	import SearchBar from '$lib/Common/SearchBar.svelte';
</script>

<div class="tableHeader">
	<div class="tableHeaderFilter">
		<DropDownButton name="filter" />
	</div>
	<div class="tableHeaderSearch">
		<SearchBar />
	</div>
	<div class="tableHeaderCreate">
		<button> Create </button>
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
