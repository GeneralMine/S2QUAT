<script>
	export let count;
	export let limit;
	export let from;
	export let to = limit > count ? count : limit;

	function previous() {
		if (from - limit >= 0) {
			from -= limit;
			to -= limit;
		}
	}
	function next() {
		if (to + limit <= count) {
			from += limit;
			to += limit;
		}
	}
</script>

<div class="tableFooter">
	{#if count === 0}
		<div class="tableFooterPages empty">No entry found.</div>
	{:else}
		<div class="tableFooterPrevious">
			<span class="pageButton" on:click={() => previous()} class:pageButtonDisabled={from - limit < 0}>Previous</span>
		</div>
		<div class="tableFooterPages">
			<span>{from}-{to} of {count}</span>
		</div>
		<div class="tableFooterNext">
			<span class="pageButton" on:click={() => next()} class:pageButtonDisabled={to === count}>Next</span>
		</div>
	{/if}
</div>

<style>
	.tableFooter {
		align-items: center;
		-webkit-box-align: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom-width: 1px;
		border-color: rgba(0, 0, 0, 0.5);
		line-height: 1;
	}
	.tableFooterPages {
		display: flex;
		justify-content: center;
		flex: 1;
	}
	.pageButton {
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
		display: inline-block;
		text-decoration: none;
		font-weight: 800;
		cursor: pointer;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-webkit-appearance: button;
		color: var(--accent-color);
	}
	.pageButtonDisabled {
		color: #444444;
		cursor: default;
	}
	.empty {
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
		text-decoration: none;
		font-weight: 800;
	}
</style>
