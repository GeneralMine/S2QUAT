<script>
	export let color;
</script>

<div class="bulbContainer">
	<div class="circle" style="background-color: {color};" />
</div>

<style>
	.bulbContainer {
		margin: 0.25rem;
	}
	.circle {
		border-radius: 100%;
		width: 1rem;
		height: 1rem;
		border: 1px solid grey;
	}
</style>
