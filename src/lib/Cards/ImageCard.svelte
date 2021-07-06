<script>
	import TitledCard from './CardComponents/TitledCard.svelte';
	export let title;
	export let src;
	export let alt = src + 'image';
</script>

<TitledCard {title}>
	<img on:click class="clickArea" src={`/logos/${src}.png`} {alt} />
</TitledCard>

<style>
	img {
		align-self: center;
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
</style>
