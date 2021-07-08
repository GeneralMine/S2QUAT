<script>
	import RadioButtonInput from './RadioButtonInput.svelte';

	export let options = ['Ja', 'Nein'];
	export let bool;

	export let edit;
</script>

<RadioButtonInput {options} bind:radioButton={bool} {edit} />
