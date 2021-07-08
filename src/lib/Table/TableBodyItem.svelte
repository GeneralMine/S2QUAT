<script>
	import { parseEnumToEmoji } from '$lib/utils/textParser';

	export let type;
	export let imgName;
	let item;

	$: item !== undefined ? (item.textContent = parseEnumToEmoji(item.textContent)) : item;
</script>

<td>
	{#if type === 'img' && imgName !== '-'}
		<img src="/logos/{imgName}.png" alt={imgName} />
	{:else}
		<span bind:this={item} class="item">
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
