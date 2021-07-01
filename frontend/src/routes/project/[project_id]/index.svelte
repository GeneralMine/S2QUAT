<script context="module">
	import { get } from '$lib/api.js';
	export async function load({ page }) {
		let response;
		try {
			response = await get('project/' + page.params.project_id);
			console.log(response);
			if (response.field) {
				return { props: { project: response.project } };
			} else {
				throw new Error('Backend ');
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<script>
	export let project;
	/*******************************************/
	import { crumbs, CrumbBuilder } from '$lib/Nav/Breadcrumbs/breadcrumbs';

	if (project.company !== undefined && project.company !== null) {
		$crumbs.push(
			CrumbBuilder.create(project.company.name, '/company/' + project.company.id, 'company').build()
		);
	}
	$crumbs.push(CrumbBuilder.create(project.name, '/project/' + project.id, 'project').build());
	/*******************************************/
</script>

<svelte:head>
	<title>Projekt ID | S2QUAT</title>
</svelte:head>

(Unternehmen) Projekte ID
