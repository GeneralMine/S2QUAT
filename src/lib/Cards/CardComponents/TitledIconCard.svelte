<script>
	import Icon from '$lib/Common/Icon.svelte';
	import Card from './Card.svelte';
	export let title;
	export let icon = 'warning';
	export let emoji = false;
	export let clickArea = false;
</script>

<Card on:click {clickArea}>
	<div class="header">
		<p class="title">{title}</p>
		<div class="iconCircle">
			<div class="iconContainer">
				<Icon name={icon} {emoji} />
			</div>
		</div>
	</div>
	<div class="content">
		<slot />
	</div>
</Card>

<style>
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.title {
		margin-top: 0;
		margin-bottom: 0;
		color: grey;
		font-size: small;
		font-weight: 100;
	}
	.iconCircle {
		display: flex;
		width: 40px;
		height: 40px;
		background-color: #00c1d4;
		border-radius: 100%;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}
	.iconContainer {
		width: 28px;
		height: 28px;
		align-items: center;
		display: flex;
		justify-content: center;
	}
</style>
