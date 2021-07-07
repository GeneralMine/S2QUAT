<script>
	import TitledIconCard from './CardComponents/TitledIconCard.svelte';
	export let survey;
</script>

<TitledIconCard title="" icon={survey.status} emoji={true} clickArea={true} on:click>
	<div class="column">
		<h2>{survey.name}</h2>
		<p class="textBlock">{survey.description}</p>
	</div>
</TitledIconCard>

<style>
	.column {
		align-items: center;
		justify-content: center;
	}
</style>
