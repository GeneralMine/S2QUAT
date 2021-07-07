<script>
	export let options;
	export let radioButton;
</script>

<p>Aktuell ausgewählt {radioButton}</p>
<div class="row">
	{#each options as value}
		<div class="column">
			<label>
				<input type="radio" bind:group={radioButton} {value} />
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
