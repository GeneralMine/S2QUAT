<script>
	import Pie from 'svelte-chartjs/src/Pie.svelte';
	import TitledIconCard from './CardComponents/TitledIconCard.svelte';
	export let title = 'Handlungsbedarf';
	export let icon;
	export let labels = ['Niedrig', 'Mittel', 'Hoch'];
	export let dataset = [32, 10, 8];
	export let colors = [
		'#1F82C0', // blau
		'#F7C137', // gelb
		'#A90013', // rot
		'#11755E', // grün
		'#C5F6EB' // hellblau
	];

	let data = {
		labels,
		datasets: [
			{
				label: title,
				data: dataset,
				backgroundColor: colors,
				borderWidth: 1
			}
		]
	};
	let options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'left',
				align: 'start'
			}
		}
	};
</script>

<TitledIconCard {title} {icon}>
	<div class="chart">
		<Pie {data} {options} />
	</div>
</TitledIconCard>

<style>
	/* https://stackoverflow.com/questions/37621020/setting-width-and-height */
	div {
		height: 95px;
		width: 247px;
	}
</style>
