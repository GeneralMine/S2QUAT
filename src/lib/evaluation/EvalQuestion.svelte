<script>
	import Boxplot from '$lib/Cards/CardComponents/Boxplot.svelte';
	import PieChart from '$lib/Cards/CardComponents/PieChart.svelte';

	import Collapsable from '$lib/Common/Collapsable.svelte';
	import Bulb from './Bulb.svelte';

	export let field;
	export let attribute;
	export let factor;
	export let question;

	let color = question.average >= 4 ? 'green' : question.average >= 3 && question.average < 4 ? 'yellow' : question.average < 3 ? 'red' : 'blue';
</script>

<div class="container">
	<p class="textBlock">{factor.description}</p>
	<Collapsable title={question.name} expanded={false}>
		<div slot="header" class="row">
			<p>Mittelwert: {question.average}</p>
			<div class="spacer" />
			<p>Standardabweichung: {question.variance}</p>
			<div class="spacer" />
			<Bulb {color} />
		</div>
		<div class="column">
			<div>
				<p>{question.description}</p>
			</div>
			<div class="row">
				<div class="chart">
					<PieChart
						dataset={Object.values(question.absoluteFrequency)}
						labels={Object.keys(question.absoluteFrequency).map((el) => el + ' ' + question.relativeFrequency[el] + '%')}
						position="right"
						align="center"
						title="Häufigkeit"
					/>
				</div>
				<div class="boxplot">
					<Boxplot title="Verteilung" dataArray={question.data} {color} />
				</div>
			</div>
		</div>
	</Collapsable>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	.row {
		align-items: center;
		justify-content: space-between;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
	.spacer {
		width: 1px;
		background-color: grey;
		height: 100%;
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.chart {
		width: 15rem;
		height: 15rem;
	}
	.boxplot {
		width: 35rem;
		height: 15rem;
	}
</style>
