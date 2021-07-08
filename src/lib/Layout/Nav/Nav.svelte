<script>
	import Breadcrumbs from './Breadcrumbs.svelte';
	import Logo from './Logo.svelte';
	import { page } from '$app/stores';
	import BreadcrumbsItem from './Breadcrumbs/BreadcrumbsItem.svelte';
	import IconButton from '$lib/Common/IconButton.svelte';

	let width;
</script>

<svelte:window bind:innerWidth={width} />

{#if width < 768}
	<div class="navContainerMobile">
		<IconButton name="menu" />
		<Logo />
		<IconButton name="account" />
	</div>
{:else}
	<div class="navContainer">
		<Logo />
		<Breadcrumbs />
		<div class="spacer" />
		<BreadcrumbsItem
			isLast={$page.path === '/account'}
			crumb={{
				name: 'Account',
				icon: 'account',
				url: '/account'
			}}
		/>
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
	.navContainerMobile {
		position: fixed;
		grid-area: nav;
		display: flex;
		width: 100%;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: var(--surface-color);
	}
</style>
