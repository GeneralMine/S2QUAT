<script>
	import Icon from './Icon.svelte';
	export let name;
</script>

<div class="iconButtonContainer clickArea" on:click|preventDefault>
	<Icon {name} fill={true} />
</div>

<style>
	.iconButtonContainer {
		width: 2rem;
		height: 2rem;
		padding: 0;
		margin: 0.75rem;
		align-items: center;
		align-self: center;
		justify-content: center;
		text-align: center;
	}
</style>
