<script>
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Layout/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [CrumbBuilder.create('Modell', '/model', 'model').build()];
	/*******************************************/
	import Surface from '$lib/Common/Surface.svelte';
	import Model from '$lib/Model/Model.svelte';
	import Overview from '$lib/Model/Overview.svelte';
</script>

<svelte:head>
	<title>Modell | S2QUAT</title>
</svelte:head>

<Surface>
	<Overview />
</Surface>

<Surface>
	<Model />
</Surface>

<style>
</style>
