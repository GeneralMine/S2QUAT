<script>
	export let title;
	export let column = false;
</script>

<div class="cardRowContainer">
	<div class="cardRowHeader">
		<h1 class="clickArea" on:click>{title}</h1>
	</div>
	<div class="cardRowContent" class:column>
		<slot />
	</div>
</div>

<style>
	.cardRowContainer {
		display: flex;
		flex-direction: column;
	}
	.cardRowHeader {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.cardRowContent {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 1em;
		margin-left: 1em;
		margin-right: 1em;
	}
	.column {
		flex-direction: column;
	}
</style>
