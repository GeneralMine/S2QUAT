<script>
	import TitledIconCard from './CardComponents/TitledIconCard.svelte';
	import Chart from 'chart.js/auto/auto.esm';
	import { onDestroy, onMount } from 'svelte';

	export let clickArea;
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

	let id = randomID();

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

	onMount(async () => {
		let ctx = document.getElementById(id).getContext('2d');
		let chart = new Chart(ctx, {
			type: 'pie',
			data,
			options
		});
		return () => chart.cleanup();
	});

	function randomID() {
		return 'chart-' + Math.floor(Math.random() * 1000);
	}
</script>

<TitledIconCard on:click {clickArea} {title} {icon}>
	<canvas {id} />
</TitledIconCard>

<style>
	canvas {
		height: 95px;
		width: 247px;
	}
</style>
