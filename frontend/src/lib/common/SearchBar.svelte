<script>
	import Icon from './Icon.svelte';
	export let placeholder = 'Search';
</script>

<div class="searchBarContainer">
	<div class="icon">
		<Icon name="search" />
	</div>
	<input class="bar" {placeholder} type="search" />
</div>

<style>
	.searchBarContainer {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 25px;
		border: 2px solid #70707070;
		height: 2rem;
		padding-right: 0.75rem;
	}
	.icon {
		margin-left: 0.75rem;
		height: 25px;
		width: 25px;
		overflow: hidden;
	}
	.bar {
		flex: 1;
		padding-left: 0.75rem;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
		height: 25px;
		border: 0;
		font-size: 100%;
	}
</style>
