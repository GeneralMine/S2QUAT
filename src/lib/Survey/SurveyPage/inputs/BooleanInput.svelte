<script>
	import RadioButtonInput from './RadioButtonInput.svelte';

	export let options = ['Ja', 'Nein'];
	export let bool;

	export let edit;
</script>

<RadioButtonInput {options} bind:radioButton={bool} {edit} />

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
