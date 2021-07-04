<script>
	export let title;
</script>

<div class="cardRowContainer">
	<div class="cardRowHeader">
		<h1 class="clickArea" on:click>{title} ></h1>
	</div>
	<div class="cardRowContent">
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
		flex-wrap: wrap;
		margin-bottom: 1em;
		margin-left: 1em;
		margin-right: 1em;
	}
</style>
