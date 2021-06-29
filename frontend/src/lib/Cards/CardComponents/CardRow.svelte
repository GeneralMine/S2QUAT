<script>
	export let title;
	export let url;
</script>

<div class="cardRowContainer">
	<a class="cardRowTitleLink" href={url}>
		<h2 class="cardRowTitle">{title} ></h2>
	</a>
	<div class="cardRow">
		<slot />
	</div>
</div>

<style>
	.cardRowContainer {
		display: flex;
		flex-direction: column;
	}

	.cardRowTitleLink {
		text-decoration: none;
		color: inherit;
	}
	.cardRowTitle {
		margin-bottom: 0.1rem;
		text-decoration: none;
	}

	.cardRow {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0;
		line-height: 1.15;
	}
</style>
