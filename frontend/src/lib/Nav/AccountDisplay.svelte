<script>
	import Icon from '$lib/Common/Icon.svelte';
	import { session } from '$app/stores';
</script>

<div class="accountDisplayContainer">
	<Icon name="account_circle" />

	<div class="textContainer">
		<p class="text">{$session?.user?.name}</p>
	</div>
</div>

<style>
	.accountDisplayContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 25px;
		border: 2px solid #707070;
		flex-direction: row;
		user-select: none;
		margin-top: auto;
		padding-right: 0.5rem;
		margin-bottom: 1rem;
		visibility: hidden;
	}

	.textContainer {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.text {
		margin: 0;
		padding: 0;
		padding-left: 0.3rem;
	}
</style>
