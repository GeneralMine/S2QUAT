<script>
	import Collapsable from '$lib/Common/Collapsable.svelte';
	import ListItemRowAdd from '$lib/List/ListItemRowAdd.svelte';
	import CategoryPrompt from '$lib/Prompt/CategoryPrompt.svelte';
	import Category from './Category.svelte';
	import { del, unpack } from '$lib/utils/api.js';

	export let project;
	export let scenario;
	export let survey;

	export let page;

	export let edit;
	export let expanded = false;

	let categoryPrompt = false;
	let selectedCategory;

	async function refreshCategories(ev) {
		if (ev.detail.updated) {
			for (let index = 0; index < page.categories.length; index++) {
				if (page.categories[index].id === ev.detail.category.id) {
					page.categories[index].name = ev.detail.category.name;
					page.categories[index].description = ev.detail.category.description;
					break;
				}
			}
		} else {
			page.categories = [...page.categories, ev.detail.category];
		}
		sort();
	}

	async function removeCategory(category) {
		const { res, err } = await unpack(() => del(`project/${project}/scenario/${scenario}/survey/${survey}/category/${category.id}`));
		if (res.id) {
			for (let index = 0; index < page.categories.length; index++) {
				if (page.categories[index].id === res.id) {
					page.categories.splice(index, 1);
					page.categories = [...page.categories];
					break;
				}
			}
		}
		sort();
	}
	function sort() {
		page.categories.sort((a, b) => a.order - b.order);
	}
	sort();
</script>

<div class="surveyPageContainer">
	<p class="surveyPageDescription">{page.description}</p>
	{#each page.categories as category, i}
		<Collapsable
			title={`${category.name} (${category.questions.reduce(
				(accumulator, question) => accumulator + (question.answer && Object.keys(question.answer).length ? 1 : 0),
				0
			)}/${category.questions.length})`}
			remove={edit}
			{expanded}
			on:remove={() => {
				removeCategory(category);
			}}
			{edit}
			on:edit={() => {
				selectedCategory = category;
				console.log('Now selected', selectedCategory);
				categoryPrompt = true;
			}}
		>
			<Category bind:category {edit} {survey} {project} {scenario} />
		</Collapsable>
	{/each}
	{#if edit}
		<ListItemRowAdd text="Neue Kategorie hinzufügen" on:click={() => (categoryPrompt = categoryPrompt = true)} />
	{/if}
</div>
{#if edit}
	<CategoryPrompt
		project={project.id}
		scenario={scenario.id}
		survey={survey.id}
		page={page.id}
		on:success={refreshCategories}
		bind:open={categoryPrompt}
		bind:category={selectedCategory}
	/>
{/if}

<style>
	.surveyPageContainer {
		padding: 2em;
		padding-top: 1em;
	}
	.surveyPageDescription {
		padding-top: 0;
		margin-top: 0;
	}
</style>
