<script>
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [];
	/*******************************************/
	import { session } from '$app/stores';
	import Surface from '$lib/Common/Surface.svelte';

	function logout() {}
</script>

<Surface title="Dein Account: {$session.user.name}">
	<button on:click={logout}> Logout </button>
</Surface>
