<script>
	import Breadcrumbs from './Breadcrumbs.svelte';
	import Logo from './Logo.svelte';
	import { page } from '$app/stores';
	import BreadcrumbsItem from './Breadcrumbs/BreadcrumbsItem.svelte';
	import Menu from './Menu.svelte';

	let width;
</script>

<svelte:window bind:innerWidth={width} />
{#if width > 768}
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
{:else}
	<div class="navContainerMobile">
		<Menu />
		<Logo />
	</div>
{/if}

<style>
	.navContainer {
		position: fixed;
		grid-area: nav;
		display: flex;
		height: 100%;
		width: 13.75rem;
		flex-direction: column;
		align-items: center;
		background-color: var(--surface-color);
	}
	.spacer {
		margin-top: auto;
	}

	@media (max-width: 768px) {
	}
</style>
