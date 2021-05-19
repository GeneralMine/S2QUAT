<script>
	import Card from '$lib/Cards/CardComponents/Card.svelte';
	import CardNumber from '$lib/Cards/CardComponents/CardNumber.svelte';
	import CardSubtitle from '$lib/Cards/CardComponents/CardSubtitle.svelte';

	export let company = {
		id: 0,
		name: 'Penguin',
		logo: 'default',
		employees: 4,
		projects: 2
	};
</script>

<Card>
	<div class="container">
		<a class="header clickArea" href="/companies/{company.id}">
			<img class="logoImg" src="logos/{company.logo}.png" alt="{company.name}s logo" />
		</a>
		<div class="cardSeperator seperator" />
		<div class="body">
			<a class="employees bodyhalf clickArea" href="/companies/{company.id}/employees">
				<CardNumber value={company.employees} />
				<CardSubtitle title="Mitarbeiter" />
			</a>
			<div class="bodySeperator seperator" />
			<a class="projects bodyhalf clickArea" href="/companies/{company.id}/projects">
				<CardNumber value={company.projects} />
				<CardSubtitle title="Projekte" />
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
	}

	.logoImg {
		width: 100%;
		height: 100%;
		object-fit: contain;
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
	.clickArea {
		text-decoration: none;
		touch-action: manipulation;
		color: black;
	}
	.clickArea:hover {
		background-color: #2e5bff25;
	}
	.bodySeperator {
		width: 1px;
		height: 80%;
	}
</style>
