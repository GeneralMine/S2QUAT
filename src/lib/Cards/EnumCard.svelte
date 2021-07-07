<script>
	import TitledCard from './CardComponents/TitledCard.svelte';
	export let title;
	export let text;
	export let responsiveHeight;

	function parseTextToEnum(text) {
		let parsed = [];
		if (text) {
			parsed = text.split('- ');
			if (parsed.length > 1) parsed.shift();
		}
		return parsed;
	}
</script>

<TitledCard {title} {responsiveHeight}>
	<ul>
		{#each parseTextToEnum(text) as item}
			<li>{item}</li>
		{/each}
	</ul>
</TitledCard>
