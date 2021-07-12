<script>
	/*******************************************/
	import { crumbs } from '$lib/Layout/Nav/Breadcrumbs/breadcrumbs';
	$crumbs = [];
	/*******************************************/
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import Surface from '$lib/Common/Surface.svelte';
	import { post } from '$lib/utils/api.js';
	import List from '$lib/List/List.svelte';
	import ListItemRow from '$lib/List/ListItemRow.svelte';
	import { parseEnumToEmoji } from '$lib/utils/textParser';

	let name = $session.user.name;
	let email = $session.user.email;
	let password = '********';
	let role = $session.user.role;
	$: disabled = name === $session.user.name && email === $session.user.email && password === '********';
	$: console.log(disabled);

	async function save() {
		let data = {};
		if (name !== $session.user.name) data.name = name;
		if (email !== $session.user.email) data.email = email;
		if (password !== '********') data.password = password;

		let response;
		try {
			response = await post(`account/save`, data);
			password = '********';
			if (response.user) {
				$session.user = response.user;
				goto('/account');
			} else {
				throw new Error('Backend did not send a user back!');
			}
		} catch (error) {
			console.log('Save wasnt successful!');
		}
	}

	async function logout() {
		let response;
		try {
			response = await post(`account/logout`, {});
		} catch (error) {
			console.log('Logout wasnt successful!');
		}
		// TODO: maybe set NULL if not works
		delete $session.user;
		goto('/login');
	}
</script>

<svelte:head>
	<title>Account | S2QUAT</title>
</svelte:head>

<Surface title="Dein Account">
	<div class="l">
		<List>
			<ListItemRow>
				<p>Name:</p>
				<input autocomplete="pager" class="keyWidth" type="text" bind:value={name} />
			</ListItemRow>
			<ListItemRow>
				<p>Rolle:</p>
				<div class="keyWidth roleDiv">
					<p class="roleText">
						{parseEnumToEmoji(role)}
					</p>
				</div>
			</ListItemRow>
			<ListItemRow>
				<p>Email:</p>
				<input autocomplete="pager" class="keyWidth" type="email" bind:value={email} />
			</ListItemRow>
			<ListItemRow>
				<p>Passwort:</p>
				<input autocomplete="pager" class="keyWidth" type="password" bind:value={password} />
			</ListItemRow>
			<ListItemRow>
				<button {disabled} class="saveButton" on:click={save}> Save Changes </button>
			</ListItemRow>
			<ListItemRow>
				<button class="logoutButton" on:click={logout}> Logout </button>
			</ListItemRow>
		</List>
	</div>
</Surface>

<style>
	.l {
		margin-left: 35rem;
		margin-right: 35rem;
	}
	.keyWidth {
		width: 20rem;
	}
	.roleDiv {
		display: flex;
		align-items: center;
	}
	.roleText {
		font-size: 22px;
		margin: 0;
		padding: 0;
	}
	.logoutButton {
		background-color: red;
	}
</style>
