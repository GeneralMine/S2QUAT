<script>
	import Icon from '$lib/common/Icon.svelte';

	export let name;
	export let icon_name = name;
</script>

<div class="breadcrumbsItemContainer">
	<Icon name={icon_name} />
	<span>{name}</span>
</div>

<style>
	.breadcrumbsItemContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 25px;
		border: 2px solid #707070;
		flex-direction: row;
		user-select: none;
		margin-top: 0.5rem;
		padding-right: 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
