<script>
	import Card from '$lib/Cards/CardComponents/Card.svelte';
	import CardNumber from '$lib/Cards/CardComponents/CardNumber.svelte';
	import CardSubtitle from '$lib/Cards/CardComponents/CardSubtitle.svelte';

	export let project;
</script>

<Card>
	<div class="container">
		<a class="header clickArea" href="/project/{project.id}">
			{#if project.company !== null}
				<img
					class="logoImg"
					src="logos/{project.company.logo}.png"
					alt="{project.company.name}s logo"
				/>
			{/if}
			<p class="projectName">{project.name}</p>
		</a>
		<div class="cardSeperator seperator" />
		<div class="body">
			<a class="users bodyhalf clickArea" href="/project/{project.id}">
				<CardNumber value={project.scenarios.length} />
				<CardSubtitle title="Szenarien" />
			</a>
			<div class="bodySeperator seperator" />
			<a class="projects bodyhalf clickArea" href="/project/{project.id}">
				<CardNumber value={project.users.length} />
				<CardSubtitle title="Verantwortliche" />
			</a>
		</div>
	</div>
</Card>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.header {
		height: 29%;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.logoImg {
		width: 30%;
		object-fit: contain;
		padding-right: 1rem;
	}

	.projectName {
		font-weight: 500;
		font-size: 1.15rem;
	}

	.seperator {
		background-color: #ebebee;
	}

	.cardSeperator {
		width: 100%;
		height: 1px;
		margin-top: 0.3rem;
		margin-bottom: 0.1rem;
	}

	.body {
		height: 62%;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
	}
	.bodyhalf {
		width: 49%;
		height: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bodySeperator {
		width: 1px;
		height: 80%;
	}
</style>
