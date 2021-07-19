<script>
	import CardNumber from '$lib/Cards/CardComponents/CardNumber.svelte';
	import CardSubtitle from '$lib/Cards/CardComponents/CardSubtitle.svelte';
	import { parseEnumToEmoji } from '$lib/utils/textParser';
	import Card from './CardComponents/Card.svelte';

	export let testperson;
</script>

<Card title="Testperson">
	<div class="container">
		<a class="header clickArea" href="/testperson/{testperson.id}">
			<p class="name">{testperson.name}</p>
		</a>
		<div class="cardSeperator seperator" />
		<div class="body">
			<a class="users bodyhalf clickArea" href="/testperson/{testperson.id}">
				<CardNumber value={testperson.age} />
				<CardSubtitle title="Alter" />
			</a>
			<div class="bodySeperator seperator" />
			<a class="testpersons bodyhalf clickArea" href="/testperson/{testperson.id}">
				<CardNumber value={parseEnumToEmoji(testperson.testpersonSex)} />
				<CardSubtitle title="Geschlecht" />
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

	.name {
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
