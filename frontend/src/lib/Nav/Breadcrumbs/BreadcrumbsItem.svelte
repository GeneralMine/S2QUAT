<script>
	import Icon from '$lib/Common/Icon.svelte';

	export let crumb = {
		name: 'Home',
		icon: 'home',
		url: '/'
	};
	export let isLast = false;
</script>

<a class:isLast class="breadcrumbsItemContainer clickArea" sveltekit:prefetch href={crumb.url}>
	<Icon name={crumb.icon} />
	<span class="breadcrumbsItemText">{crumb.name.substring(0, 12)}</span>
</a>

<style>
	.breadcrumbsItemContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 25px;
		/* border: 2px solid #707070; */
		flex-direction: row;
		user-select: none;
		margin-top: 0.5rem;
		padding-right: 0.5rem;
		padding-left: 0.5rem;
		margin-bottom: 0.5rem;
		text-decoration: none;
		color: inherit;
	}
	.isLast {
		background-color: #6eccfc;
		color: white;
	}
	.breadcrumbsItemText {
		padding-left: 0.2rem;
		padding-right: 0.2rem;
	}
</style>
