<script>
	import Card from '$lib/Cards/CardComponents/Card.svelte';
	import CardNumber from '$lib/Cards/CardComponents/CardNumber.svelte';
	import CardSubtitle from '$lib/Cards/CardComponents/CardSubtitle.svelte';
	import Icon from '$lib/common/Icon.svelte';

	export let template = {
		id: 0,
		name: 'Penguin',
		projekte: 2
	};
</script>

<Card>
	<a class="container clickArea" href="/template/{template.id}">
		<div class="header">
			<p class="templateName">{template.name}</p>
		</div>
		<div class="cardSeperator seperator" />
		<div class="body">
			<CardNumber value={template.projekte} />
			<CardSubtitle title="verwendet in Projekten" />
		</div>
	</a>
</Card>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.header {
		height: 29%;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.icon {
		width: 30%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-right: 1rem;
	}
	.templateName {
		font-weight: 500;
		font-size: 1.15rem;
	}

	.seperator {
		background-color: #ebebee;
	}

	.cardSeperator {
		width: 100%;
		height: 1px;
		margin-top: 0.3rem;
		margin-bottom: 0.1rem;
	}

	.body {
		height: 62%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}
	.clickArea {
		text-decoration: none;
		touch-action: manipulation;
		color: black;
	}
	.clickArea:hover {
		background-color: #2e5bff25;
	}
</style>
