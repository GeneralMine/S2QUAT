<script>
	export let options;
	export let selection;

	let raw = [];

	function updateSelection() {
		selection = options.map((el, index) => raw.includes(index));
	}
</script>

<div class="row">
	{#each options as option, i}
		<div class="column">
			<label>
				<input type="checkbox" value={i} bind:group={raw} on:change={updateSelection} />
				{option}
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
	label {
		text-align: center;
	}
</style>
