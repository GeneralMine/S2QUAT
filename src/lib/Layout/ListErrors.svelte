<script>
	export let errors;
</script>

{#if errors}
	{#each Object.keys(errors) as key}
		<div class="error-messages">{key} {errors[key]}</div>
	{/each}
{/if}

<style>
	.error-messages {
		color: #b85c5c !important;
		font-weight: 700;
	}
</style>
