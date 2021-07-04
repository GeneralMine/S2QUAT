<script>
	import Icon from './Icon.svelte';
	export let title;
	export let icon = title;
	export let url;
</script>

<a class="iconButtonContainer" href={url} on:click|preventDefault>
	<Icon title={icon} />
</a>

<style>
	.iconButtonContainer {
		cursor: pointer;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0.75rem;
		align-items: center;
		align-self: center;
		justify-content: center;
		text-align: center;
		opacity: 0.5;
	}
	.iconButtonContainer:hover {
		opacity: 1;
	}
</style>
