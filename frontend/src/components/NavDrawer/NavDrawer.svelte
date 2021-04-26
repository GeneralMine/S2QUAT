<script>
	import NavDrawerItem from "./NavDrawerItem.svelte";
	import NavDrawerCategory from "./NavDrawerCategory.svelte";
	import NavDrawerSeperator from "./NavDrawerSeperator.svelte";
	import { goto } from "@sapper/app";

	export let selected;

	let entities = ["actions", "companies", "employees", "models", "projects", "questionAnswers", "questions", "scenarios", "surveyResponses", "testPersons", "users"];
</script>

<div class="drawer">
	<a href="/" class="imageContainer">
		<img class="image" src="logo-width.png" alt="S2QUAT Logo" />
	</a>
	<div id="shadowland">
		<div class="list">
			<NavDrawerItem {selected} title="dashboard" url={"/dashboard"} />

			<NavDrawerSeperator title="Database" />
			<NavDrawerItem {selected} title="datatree" url={"/datatree"} />
			<NavDrawerItem {selected} title="datamodel" url={"/datamodel"} />
			<!-- <NavDrawerItem {selected} title="demo" url={"/demo"} /> -->

			<NavDrawerSeperator title="Entities" />
			{#each entities as entity}
				<NavDrawerItem {selected} title={entity} url={"/" + entity} />
			{/each}
		</div>
	</div>
</div>

<style>
	#shadowland {
		box-shadow: 5px 0 5px -5px #e4e8f0;
		flex-grow: 1;
	}
	.drawer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.imageContainer {
		width: 100%;
		height: 3.75rem;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
	}
	.image {
		width: 90%;
		height: 90%;
		margin: auto;
		align-self: center;
		text-align: center;
		padding: 0;
		object-fit: scale-down;
	}
</style>
