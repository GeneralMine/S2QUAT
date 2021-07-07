<script>
	export let score;

	let values = [1, 2, 3, 4, 5];
</script>

<p>Aktuell ausgewählt {score}</p>
<div class="row">
	{#each values as value}
		<div class="column">
			<label>
				<input type="radio" bind:group={score} {value} />
				{value}
			</label>
		</div>
	{/each}
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		justify-content: space-around;
	}
	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	label {
		text-align: center;
	}
</style>
