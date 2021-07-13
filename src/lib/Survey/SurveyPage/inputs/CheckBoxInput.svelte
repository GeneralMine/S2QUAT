<script>
	export let options;
	export let checkbox;

	let raw = [];
	if (checkbox) {
		for (let index = 0; index < checkbox.length; index++) {
			if (checkbox[index]) {
				raw.push(index);
			}
		}
	}
	function updateSelection() {
		checkbox = options.map((el, index) => raw.includes(index));
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
