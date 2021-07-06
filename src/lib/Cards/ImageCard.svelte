<script>
	import Card from './CardComponents/Card.svelte';

	export let src;
	export let alt = src + 'image';
</script>

<Card>
	<img {src} {alt} />
</Card>

<style>
	img {
		align-self: center;
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
</style>
