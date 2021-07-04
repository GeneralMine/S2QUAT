<script>
	export let name;
	$: src = '/icons/' + name + '.svg';
	$: alt = name + ' icon';
</script>

<img {src} {alt} />

<style>
	img {
		opacity: 0.6;
		padding: 0;
		margin: 0;
		align-self: center;
		object-fit: contain;
	}
</style>
