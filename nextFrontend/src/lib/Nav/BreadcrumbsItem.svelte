<script>
	import Icon from '$lib/common/Icon.svelte';

	export let icon_name;
	export let name;
	export let is_last;
</script>

<Icon name={icon_name} />
<span>{name}</span>
{#if !is_last}>{/if}
