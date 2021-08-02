<script>
	import Chart from 'chart.js/auto/auto.esm';
	import { onMount } from 'svelte';

	export let title;
	export let labels = ['Niedrig', 'Mittel', 'Hoch'];
	export let dataset = [32, 10, 8];
	export let colors = [
		'#B60A1C', // rot
		'#E03531', // hellblau
		'#F0BD27', // gelb
		'#51B364', // blau
		'#309143' // grün
	];
	export let position = 'left';
	export let align = 'start';

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
			title: {
				display: title,
				text: title
			},
			legend: {
				position,
				align
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

<canvas {id} />

<style>
	canvas {
		height: 100%;
		width: 100%;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
</style>
