<script>
	import Surface from '$lib/Common/Surface.svelte';
	import Model from '$lib/Model/Model.svelte';

	export let scenario;
</script>

<div class="scenarioPageContainer" title={scenario.name}>
	<p class="textBlock">{scenario.description}</p>

	<div class="dataModel">
		<Model />
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
		transform: scale(0.5);
		-webkit-transform: scale(0.5);
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
	}
</style>
