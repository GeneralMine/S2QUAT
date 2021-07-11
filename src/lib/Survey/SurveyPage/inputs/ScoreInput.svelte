<script>
	export let score;
	let values = [5, 4, 3, 2, 1];
	let text = ['Trifft zu', 'Trifft eher zu', 'Unentschieden', 'Trifft eher nicht zu', 'Trifft nicht zu'];
</script>

<div class="row">
	{#each values as value, i}
		<div class="column">
			<label>
				<input type="radio" bind:group={score} {value} />
				{text[i]}
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
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
</style>
