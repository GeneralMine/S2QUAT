<script>
	import Icon from '$lib/Common/Icon.svelte';
	import ListItemRow from './ListItemRow.svelte';

	export let text;
</script>

<ListItemRow clickArea={true} flexstart={true} on:click>
	<div class="icon">
		<Icon name="add" fill={true} />
	</div>
	<p class="text">{text}</p>
</ListItemRow>

<style>
	.icon {
		width: 2rem;
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.text {
		margin-left: 1rem;
		font-size: small;
		color: grey;
		font-weight: 100;
	}
</style>
