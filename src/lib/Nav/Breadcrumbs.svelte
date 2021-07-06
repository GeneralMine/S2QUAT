<script>
	import BreadcrumbsItem from '$lib/Nav/Breadcrumbs/BreadcrumbsItem.svelte';
	import BreadcrumbsSeperator from '$lib/Nav/Breadcrumbs/BreadcrumbsSeperator.svelte';

	import { crumbs } from '$lib/Nav/Breadcrumbs/breadcrumbs';
</script>

<div class="breadcrumbsContainer">
	{#each $crumbs as crumb, i}
		{#if i === 0}
			<div class="spacer" />
		{/if}
		<BreadcrumbsSeperator />
		<BreadcrumbsItem crumb={crumb.page} isLast={$crumbs.length - 1 === i} />
	{/each}
</div>

<style>
	.breadcrumbsContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.spacer {
		height: 8px;
	}
</style>
