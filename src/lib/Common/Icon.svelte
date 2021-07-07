<script>
	import { parseEnumToEmoji } from '$lib/textParser';

	export let name;
	$: src = '/icons/' + name + '.svg';
	$: alt = name + ' icon';

	export let fill = false;
	export let emoji = false;
</script>

{#if emoji}
	<p class="icon" class:emoji>{parseEnumToEmoji(name)}</p>
{:else}
	<img class="icon" class:fill {src} {alt} />
{/if}

<style>
	.icon {
		opacity: 0.6;
		padding: 0;
		margin: 0;
		align-self: center;
		justify-self: center;
		object-fit: contain;
	}
	.emoji {
		opacity: 1;
	}
	.fill {
		width: 100%;
		height: 100%;
	}
</style>
