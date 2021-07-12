<script>
	import RadioButtonInput from './RadioButtonInput.svelte';

	export let options = ['Ja', 'Nein'];
	export let boolean;

	export let edit;
</script>

<RadioButtonInput {options} bind:radiobutton={boolean} {edit} />
