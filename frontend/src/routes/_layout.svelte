<script context="module">
	export function preload(page) {
		return { url_path: page.path };
	}
</script>

<script>
	import NavDrawer from "../components/NavDrawer/NavDrawer.svelte";
	import NavStatus from "../components/NavStatus/NavStatus.svelte";
	import RainbowBox from "../components/common/RainbowBox.svelte";
	import Footer from "../components/common/Footer.svelte";

	import { stores } from "@sapper/app";
	const { page } = stores();

	import { is_loading } from "../components/still_loading.js";

	export let segment;
	$: url_path = $page.path;

	let layoutFreeSites = ["login", "register", "impressum", "about", "privacy"];

	function shouldBeLayoutFree(s, url_path) {
		if ((url_path.endsWith("/survey") && url_path.startsWith("/scenarios")) || layoutFreeSites.includes(s)) {
			return true;
		} else {
			return false;
		}
	}

	$: selected = segment === undefined ? "dashboard" : segment;
</script>

<div class="root">
	{#if $is_loading}
		<div class="loader">
			<RainbowBox />
		</div>
	{/if}
	{#if shouldBeLayoutFree(segment, url_path)}
		<slot class="background" />
	{:else}
		<div class="layoutContainer">
			<div class="leftBlock">
				<div class="navDrawer surfaceColor">
					<NavDrawer {selected} />
				</div>
			</div>
			<div class="rightBlock">
				<div class="rightColumn backgroundColor">
					<div class="navStatus surfaceColor">
						<NavStatus {selected} />
					</div>
					<div id="container" class="container">
						<slot />
						<div class="spacer" />
						<Footer />
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.root {
		width: 100%;
		height: 100%;
	}
	.loader {
		z-index: 99999;
		position: fixed;
		height: 10px;
		top: 0%;
		left: 0%;
		right: 0%;
		height: 5px;
	}
	.layoutContainer {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
	}
	.leftBlock {
		z-index: 10;
		width: 11.5%;
		height: 100%;
		display: flex;
		background-color: white;
		flex-shrink: 0;
	}
	.rightBlock {
		z-index: 9;
		width: 88.5%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.rightColumn {
		z-index: 10;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.navDrawer {
		z-index: 10;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: sticky;
	}
	.navStatus {
		z-index: 11;
		height: 3.75rem;
		width: 100%;
	}
	.container {
		padding: 2rem;
		z-index: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 53.25rem;
	}
	.spacer {
		flex: 1;
	}
</style>
