<script>
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [CrumbBuilder.create('Modell', '/model', 'model').build()];
	/*******************************************/
	import Surface from '$lib/Common/Surface.svelte';
	import ModelItem from '$lib/Model/ModelItem.svelte';
	import Model from '$lib/Model/Model.svelte';
</script>

<svelte:head>
	<title>Modell | S2QUAT</title>
</svelte:head>

<Surface>
	<Model />
</Surface>

<style>
</style>
