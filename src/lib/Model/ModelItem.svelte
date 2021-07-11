<script>
	import { goto } from '$app/navigation';
	export let fieldId;
	export let clickable;

	function click() {
		if (clickable) {
			goto('/model/field/' + fieldId);
		}
	}
</script>

<div class="grid-item" class:clickArea={clickable} on:click={click}>
	<p class="text">
		Feld {fieldId}
	</p>
</div>

<style>
	.grid-item {
		display: flex;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		align-items: center;
		font-size: 1.6rem;
		justify-content: center;
	}
	.text {
		text-align: center;
	}
</style>
