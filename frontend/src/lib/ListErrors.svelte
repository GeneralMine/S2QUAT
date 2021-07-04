<script>
	export let errors;
</script>

{#if errors}
	<ul class="error-messages">
		{#each Object.keys(errors) as key}
			<li>{key} {errors[key]}</li>
		{/each}
	</ul>
{/if}

<style>
	.error-messages {
		color: #b85c5c !important;
		font-weight: 700;
	}
</style>
