<script>
	import TitledIconCard from './CardComponents/TitledIconCard.svelte';
	import PieChart from './CardComponents/PieChart.svelte';

	export let clickArea;
	export let title = 'Handlungsbedarf';
	export let icon;
	export let labels = ['Niedrig', 'Mittel', 'Hoch'];
	export let dataset = [32, 10, 8];
</script>

<TitledIconCard on:click {clickArea} {title} {icon}>
	<div class="chart">
		<PieChart {dataset} {labels} />
	</div>
</TitledIconCard>

<style>
	.chart {
		height: 95px;
		width: 247px;
	}
</style>
