<script context="module">
	export async function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<script>
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { post } from '$lib/utils/api.js';
	import ListErrors from '$lib/Layout/ListErrors.svelte';
	import Footer from '$lib/Common/Footer.svelte';

	let email = '';
	let password = '';
	let errors = null;
	let disabled = false;
	let width;

	async function login(event) {
		console.log('Trying to login...');
		disabled = true;
		let response;
		try {
			response = await post(`login/login`, { email, password });
			if (response.user) {
				errors = null;
				console.log('Got user', response.user);
				$session.user = response.user;
				goto('/');
			} else {
				throw new Error('Backend did not send a user back!');
			}
		} catch (error) {
			errors = {};
			errors[''] = response.error;

			disabled = false;
		}
	}
</script>

<svelte:window bind:innerWidth={width} />

<svelte:head>
	<title>Login | S2QUAT</title>
</svelte:head>

<div class="areaContainer">
	<div class="loginArea">
		<div class="spacer" />
		<div class="logo">
			<img class="logoPicture" src="logo-width.png" alt="S2QUAT Logo" />
		</div>

		<h2>Login</h2>

		<ListErrors bind:errors />

		<form on:submit|preventDefault={login}>
			<label for="email">Email</label>
			<input
				autocomplete="email"
				id="email"
				type="email"
				required
				placeholder="Email Adresse"
				bind:value={email}
			/>

			<label for="password">Password</label>
			<input
				autocomplete="current-password"
				id="password"
				type="password"
				required
				placeholder="Passwort"
				bind:value={password}
			/>
			<button {disabled} type="submit"> Sign in </button>
		</form>
		<a class="requestAccess" href="/register">Request access</a>

		<div class="spacer" />

		<Footer />
	</div>

	{#if width < 756}
		<!-- content here -->
	{:else}
		<div class="pictureArea">
			<img class="picture" src="loginPicture.jpg" alt="Italian Trulli" />
		</div>
	{/if}
</div>

<style>
	.areaContainer {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.loginArea {
		flex: 3;
		height: 100vh;
		position: relative;
		max-width: 30em;
		background-color: white;
		padding: 2em;
		box-sizing: border-box;
		text-align: center;
		align-items: center;
		justify-content: center;
		margin: auto;
		display: flex;
		flex-direction: column;
	}
	form {
		display: flex;
		flex-direction: column;
		width: 80%;
	}
	.logo {
		max-height: 100px;
		padding: 2em;
	}
	.logoPicture {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
	.pictureArea {
		flex: 5;
		height: 100vh;
	}
	.picture {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
	.spacer {
		flex: 1;
	}
	.requestAccess {
		color: var(--accent-color);
		padding-top: 0.5rem;
		text-decoration: none;
	}
</style>
