<script>
	export let text;
	export let rows = 4;
	export let placeholder = 'Ihre Einschätzung...';
</script>

<textarea {rows} {placeholder} type="text" bind:value={text} />
