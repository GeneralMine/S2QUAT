<script>
	import Icon from '$lib/common/Icon.svelte';

	export let crumb = {
		name: 'Home',
		icon: 'home',
		url: '/'
	};
</script>

<a class="breadcrumbsItemContainer" sveltekit:prefetch href={crumb.url}>
	<Icon name={crumb.icon} />
	<span class="breadcrumbsItemText">{crumb.name}</span>
</a>

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
		padding-left: 0.5rem;
		margin-bottom: 0.5rem;
		text-decoration: none;
		color: inherit;
	}
	.breadcrumbsItemText {
		padding-left: 0.2rem;
		padding-right: 0.2rem;
	}
</style>
