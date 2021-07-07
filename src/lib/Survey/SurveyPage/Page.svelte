<script>
	import Collapsable from '$lib/Common/Collapsable.svelte';
	import Category from './Category.svelte';

	export let page;
</script>

<div class="surveyPageContainer">
	<p>{page.description}</p>
	{#each page.categories as category, i}
		<Collapsable
			title={`${category.name} (${category.questions.reduce(
				(accumulator, currentValue) => accumulator + currentValue.x,
				0
			)}/${category.questions.length})`}
		>
			<Category bind:category />
		</Collapsable>
	{/each}
</div>

<style>
	.surveyPageContainer {
		padding: 2em;
	}
</style>
