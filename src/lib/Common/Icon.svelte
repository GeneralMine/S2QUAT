<script>
	export let name;
	$: src = '/icons/' + name + '.svg';
	$: alt = name + ' icon';

	export let fill = false;
</script>

<img class:fill {src} {alt} />

<style>
	img {
		opacity: 0.6;
		padding: 0;
		margin: 0;
		align-self: center;
		object-fit: contain;
	}

	.fill {
		width: 100%;
		height: 100%;
	}
</style>
