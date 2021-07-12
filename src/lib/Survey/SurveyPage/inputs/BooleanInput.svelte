<script>
	export let options = ['Ja', 'Nein'];
	export let boolean;
</script>

<div class="row">
	<div class="column">
		<label>
			<input type="radio" bind:group={boolean} value={false} />
			{options[0]}
		</label>
	</div>
	<div class="column">
		<label>
			<input type="radio" bind:group={boolean} value={true} />
			{options[1]}
		</label>
	</div>
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
		cursor: pointer;
	}
	label {
		cursor: pointer;
		text-align: center;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
</style>
