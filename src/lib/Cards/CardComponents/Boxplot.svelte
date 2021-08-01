<script>
	import Chart from 'chart.js/auto/auto.esm';
	import { BoxPlotChart } from '@sgratzl/chartjs-chart-boxplot';
	import { onMount } from 'svelte';

	export let title = 'Handlungsbedarf';
	export let labels = ['First'];
	export let dataArray;
	export let position = 'left';
	export let align = 'start';
	export let color = 'red';

	let id = randomID();

	let data = [dataArray.map((el) => parseFloat(el))];
	console.log('Data', data);

	onMount(async () => {
		let ctx = document.getElementById(id).getContext('2d');
		let chart = new BoxPlotChart(ctx, {
			data: {
				labels,
				datasets: [
					{
						label: 'Dataset 1',
						backgroundColor: 'rgba(255,0,0,0.5)',
						borderColor: color,
						outlierColor: color,
						backgroundColor: color,
						borderWidth: 1,
						padding: 10,
						itemRadius: 0,
						data
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					title: {
						display: true,
						text: title
					},
					legend: {
						display: false,
						position,
						align
					}
				},
				indexAxis: 'y'
			}
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
