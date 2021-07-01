<script>
	export let type;
	export let imgName;
</script>

<td>
	{#if type === 'img'}
		<img src="/logos/{imgName}.png" alt={imgName} />
	{:else}
		<span class="item">
			<slot />
		</span>
	{/if}
</td>

<style>
	.item {
		white-space: nowrap;
	}
	img {
		height: 30px;
		width: auto;
		object-fit: contain;
	}
</style>
