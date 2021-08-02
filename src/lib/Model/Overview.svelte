<script>
	import Surface from '$lib/Common/Surface.svelte';

	const colors = ['9,176,56', '9,186,110', '9,164,186', '9,111,176'];
	const levels = ['Bewertungsfelder', 'Qualitätsmerkmale', 'Qualitätsbestimmende Faktoren', 'Bewertungskriterien'];
</script>

<div class="overviewContainer">
	<div style="display: flex; flex-direction: row; align-items: center; padding: 1em;">
		<div style="flex-flow: 1; flex-grow: 1; display: flex; flex-direction: row; align-items: center;">
			{#each colors as color, i}
				<div
					style="flex-flow: {i}; display: flex; flex-direction: row; align-items: center; padding-right: 5px; padding-left: 5px; padding-top: -8px; padding-bottom: -8px;border-width: 7px; border-color: rgba({color}, 0.2); border-style: solid;"
				>
					<p style="">{levels[i]}</p>
				</div>
				{#if !(i == colors.length - 1)}
					<p style="margins: 15px; padding: 5px;">{' >> '}</p>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.overviewContainer {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
