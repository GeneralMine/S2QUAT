<div class="tableHeader">
	<div class="tableHeaderPrevious">
		<span class="pageButton">Previous</span>
	</div>
	<div class="tableHeaderPages">
		<span>Pages</span>
	</div>
	<div class="tableHeaderNext">
		<span class="pageButton">Next</span>
	</div>
</div>

<style>
	.tableHeader {
		align-items: center;
		-webkit-box-align: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom-width: 1px;
		border-color: rgba(0, 0, 0, 0.5);
		line-height: 1;
	}
	.tableHeaderPrevious {
	}
	.tableHeaderNext {
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
		-webkit-appearance: button;
		color: var(--accent-color);
	}
	.tableHeaderCreate {
		flex-shrink: 0;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}
</style>
