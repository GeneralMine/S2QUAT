<script>
	/********************************************
	 * Getting env variables from session store */
	import { stores } from "@sapper/app";
	const { session } = stores();
	$: BACKEND_URL = $session.BACKEND_URL;
	$: user = $session.user;
	/*******************************************/
	import CardRow from "../components/Cards/CardRow.svelte";
	import NumberCard from "../components/Cards/NumberCard.svelte";
	import PieCard from "../components/Cards/PieCard.svelte";
	import { postData, getData, capitalizeFirstLetter } from "../lib";
	import cardFunctions from "../lib/cardFunctions";
	import { onMount, onDestroy } from "svelte";

	let entities = ["actions", "companies", "employees", "models", "projects", "questionAnswers", "questions", "scenarios", "surveyResponses", "testPersons", "users"];
	let entitiesData = {};

	onMount(async () => {
		entities.forEach(async (entity) => {
			const url = BACKEND_URL + "/" + entity;
			entitiesData[entity] = await (await getData(url)).json();
			console.log("Loaded:", entity);
		});
		console.log("Loaded all data", entitiesData);
	});
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="pageContainer">
	<CardRow>
		{#if Object.keys(entitiesData).length === entities.length}
			{#each entities as entity}
				<NumberCard title={"Anzahl " + capitalizeFirstLetter(entity)} value={entitiesData[entity].length} icon={entity} />
			{/each}
		{:else}{Object.keys(entitiesData)}{/if}
	</CardRow>
</div>

<style>
	.pageContainer {
	}
	.cardContainer {
	}
</style>
