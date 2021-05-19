<script>
	export let name;
	$: src = '/icons/' + name + '.svg';
	$: alt = name + ' icon';

	export let width;
	export let height;
</script>

<img style="width: {width}; height: {height};" {src} {alt} />

<style>
	img {
		opacity: 0.6;
		padding: 0;
		margin: 0;
		align-self: center;
		object-fit: contain;
	}
</style>
