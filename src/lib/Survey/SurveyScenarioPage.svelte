<script>
	import Model from '$lib/Model/Model.svelte';

	export let scenario;
</script>

<div class="scenarioPageContainer" title={scenario.name}>
	<p class="textBlock">{scenario.description}</p>

	<div class="dataModel">
		<Model clickable={false} />
	</div>
</div>

<style>
	p {
		padding-left: 1em;
		padding-right: 1em;
	}
	.dataModel {
		width: 100%;
		height: 350px;
		transform: scale(0.6);
		-webkit-transform: scale(0.6);
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
	}
</style>
