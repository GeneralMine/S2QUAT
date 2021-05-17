<script>
	import Icon from '../common/Icon.svelte';
	import Surface from '../common/Surface.svelte';

	export let title;
	export let icon = 'warning';
</script>

<Surface>
	<div class="cardContainer">
		<div class="header">
			<p class="title">{title}</p>
			<div class="iconCircle">
				<div class="iconContainer">
					<Icon name={icon} />
				</div>
			</div>
		</div>
		<div class="content">
			<slot />
		</div>
	</div>
</Surface>

<style>
	.cardContainer {
		display: flex;
		flex-direction: column;
		/* width: 263 */
		width: 244px;
		height: 144px;
		/* padding: 1em; */
		padding-top: 1rem;
		padding-bottom: 1rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		margin: 0;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
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
	}
</style>
