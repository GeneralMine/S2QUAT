<script>
	import AccountDisplay from '$lib/Nav/AccountDisplay.svelte';
	import Breadcrumbs from './Nav/Breadcrumbs.svelte';
	import Logo from './Nav/Logo.svelte';
</script>

<div class="navContainer">
	<Logo />

	<Breadcrumbs />
	<AccountDisplay />
</div>

<style>
	.navContainer {
		position: fixed;
		grid-area: nav;
		display: flex;
		height: 100%;
		flex-direction: column;
		align-items: center;
		padding-left: 1rem;
		padding-right: 1rem;
		background-color: var(--surface-color);
	}
</style>
