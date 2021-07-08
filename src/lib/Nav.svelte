<script>
	import AccountDisplay from '$lib/Nav/AccountDisplay.svelte';
	import Icon from './Common/Icon.svelte';
	import Breadcrumbs from './Nav/Breadcrumbs.svelte';
	import Logo from './Nav/Logo.svelte';
	import { page } from '$app/stores';
	import BreadcrumbsItem from './Nav/Breadcrumbs/BreadcrumbsItem.svelte';
</script>

<div class="navContainer">
	<Logo />

	<Breadcrumbs />
	<div class="spacer" />
	<BreadcrumbsItem
		isLast={$page.path === '/account'}
		crumb={{
			name: 'Account',
			icon: 'account_circle',
			url: '/account'
		}}
	/>
</div>

<style>
	.navContainer {
		position: fixed;
		grid-area: nav;
		display: flex;
		height: 100%;
		width: 13.75rem;
		flex-direction: column;
		align-items: center;
		/* padding-left: 1rem;
		padding-right: 1rem; */
		background-color: var(--surface-color);
	}
	.spacer {
		margin-top: auto;
	}
</style>
