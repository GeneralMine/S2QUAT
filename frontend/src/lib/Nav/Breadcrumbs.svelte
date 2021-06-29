<script>
	import BreadcrumbsItem from '$lib/Nav/Breadcrumbs/BreadcrumbsItem.svelte';
	import BreadcrumbsSeperator from '$lib/Nav/Breadcrumbs/BreadcrumbsSeperator.svelte';

	import { crumbs } from '$lib/Nav/Breadcrumbs/breadcrumbs';
</script>

<div class="breadcrumbsContainer">
	{#each $crumbs as crumb}
		<BreadcrumbsSeperator />
		<BreadcrumbsItem crumb={crumb.page} />
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
