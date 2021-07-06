<script>
	import Icon from '$lib/Common/Icon.svelte';

	export let crumb = {
		name: 'Home',
		icon: 'home',
		url: '/'
	};
	export let isLast = false;
</script>

<a class="item" class:isLast href={crumb.url}>
	<div class="icon">
		<Icon name={crumb.icon} />
	</div>
	<span class="text">{crumb.name}</span>
</a>

<style>
	.item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
		text-decoration: none;
		height: 56px;
		width: 100%;
		line-height: 1.375rem;
		font-size: 0.95rem;
		font-weight: 500;
	}
	.item:hover {
		background-color: #2e5bff25;
	}
	.icon {
		margin-left: 16px;
		margin-right: 16px;
		width: 24px;
		height: 24px;
		line-height: 1;
	}
	.text {
		text-decoration: none;
		font-size: 0.95rem;
		line-height: 1.375rem;
		font-weight: 500;
		letter-spacing: 0.00714em;
		text-transform: inherit;
		margin-right: 16px;
	}
	.isLast {
		background-color: #2e5bff25;
		color: #2e5bff;
		border-left: 6px solid #2e5bff;
	}
</style>
