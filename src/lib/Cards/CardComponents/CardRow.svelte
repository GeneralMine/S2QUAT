<script>
	export let title = '';
	export let column = false;
	export let smallTitle = false;
	export let clickArea = false;
</script>

<div class="cardRowContainer">
	<div class="cardRowHeader">
		<h1 class:clickArea on:click class:smallTitle>{title}</h1>
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
	}
	.column {
		flex-direction: column;
	}
	.smallTitle {
		font-size: 18px;
	}
</style>
