<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import TitledIconCard from './CardComponents/TitledIconCard.svelte';
	let id = randomID();
	export let title = 'Handlungsbedarf';
	export let icon;
	export let labels = ['Niedrig', 'Mittel', 'Hoch'];
	export let data = [32, 10, 8];
	export let colors = [
		'#1F82C0', // blau
		'#F7C137', // gelb
		'#A90013', // rot
		'#11755E', // grün
		'#C5F6EB' // hellblau
	];
	// $: if (chartContext) my_chart = drawChart(chartContext, data, labels);
	let my_chart;
	let ref;
	let chartContext;
	let chartCanvas;

	onMount(() => {
		chartContext = chartCanvas.getContext('2d');
		my_chart = drawChart(chartContext, data, labels);

		return () => {
			my_chart.destroy();
		};
	});

	function drawChart(chartContext, data, labels) {
		const myChart = new Chart(chartContext, {
			type: 'pie',
			data: {
				labels,
				datasets: [
					{
						label: title,
						data,
						backgroundColor: colors,
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'left',
						align: 'start'
					}
				}
			}
		});
		myChart.canvas.parentNode.style.height = ref.style.height;
		myChart.canvas.parentNode.style.width = ref.style.width;

		return myChart;
	}
	function randomID() {
		return 'chart-' + Math.floor(Math.random() * 1000);
	}
</script>

<TitledIconCard {title} {icon}>
	<div bind:this={ref} class="chart">
		<canvas bind:this={chartCanvas} {id} />
	</div>
</TitledIconCard>

<style>
	/* https://stackoverflow.com/questions/37621020/setting-width-and-height */
	div {
		height: 95px;
		width: 247px;
	}
</style>
