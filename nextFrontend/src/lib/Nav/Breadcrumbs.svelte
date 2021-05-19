<script>
	import BreadcrumbsItem from '$lib/Nav/Breadcrumbs/BreadcrumbsItem.svelte';
	import BreadcrumbsSeperator from '$lib/Nav/Breadcrumbs/BreadcrumbsSeperator.svelte';

	//TODO: build from breadcrumbs.js store

	export let crumbs = [];
</script>

<div class="breadcrumbsContainer">
	<BreadcrumbsItem name="home" is_last={crumbs.length > 0} />
	{#each crumbs as crumb, i}
		<BreadcrumbsSeperator />
		<BreadcrumbsItem name={crumb} />
	{/each}
</div>

<style>
	.breadcrumbsContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
