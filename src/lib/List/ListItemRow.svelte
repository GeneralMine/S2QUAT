<script>
	export let clickArea = false;
	export let flexstart;
</script>

<div class="listItemRowContainer" class:clickArea class:flexstart on:click>
	<slot />
</div>

<style>
	.listItemRowContainer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		text-align: left;
		align-items: center;
	}
	.flexstart {
		justify-content: flex-start;
	}
</style>
