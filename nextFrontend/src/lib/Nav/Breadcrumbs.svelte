<script>
	import Icon from '$lib/common/Icon.svelte';
	import BreadcrumbsItem from '$lib/Nav/BreadcrumbsItem.svelte';

	//TODO: build from breadcrumbs.js store

	// icons
	// / -> Home
	// /questions -> Home, Questions
	// /models -> Home, Models
	// /companies/ID -> Home, Companies,
	// /companies/ID/employees -> Home, Companies, Employees
	let iconNames = [
		'home',
		'companies',
		'employees',
		'projects',
		'users',
		'analytics',
		'scenaries',
		'surveyResponses',
		'testPersons',
		'models',
		'questions',
		'questionAnswers'
	];

	export let crumbs = [];
</script>

<div class="breadcrumbsContainer">
	<BreadcrumbsItem name="Home" is_last={crumbs.length > 0} />
	{#each crumbs as crumb, i}
		<BreadcrumbsItem name={crumb} is_last={i >= crumbs.length - 1} />
	{/each}
</div>

<style>
	.breadcrumbsContainer {
		display: flex;
		flex-direction: column;
	}
</style>
