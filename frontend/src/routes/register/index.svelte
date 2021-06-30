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
	import { post } from '$lib/api.js';
	import ListErrors from '$lib/ListErrors.svelte';
	import Footer from '$lib/common/Footer.svelte';

	let name = '';
	let email = '';
	let password = '';
	let errors = null;

	async function submit(event) {
		console.log('Try to register...');
		let { res, err } = await post(`auth/register`, { name, email, password });
		if (err) {
			errors = err;
			return;
		}
		errors = 'Please wait until an admin has approved your request!';
	}
</script>

<svelte:head>
	<title>Register | S2QUAT</title>
</svelte:head>

<div class="areaContainer">
	<div class="loginArea">
		<div class="spacer" />
		<div class="logo">
			<img class="logoPicture" src="logo-width.png" alt="S2QUAT Logo" />
		</div>

		<h2>Request Access</h2>

		<ListErrors {errors} />

		<form on:submit|preventDefault={submit}>
			<label for="ftext">Fullname</label>
			<input id="ftext" type="text" required placeholder="Max Mustermann" bind:value={name} />

			<label for="femail">Email</label>
			<input id="femail" type="email" required placeholder="test@tester.com" bind:value={email} />

			<label for="fpassword">Password</label>
			<input
				id="fpassword"
				type="password"
				required
				placeholder="not123456"
				bind:value={password}
			/>

			<button type="submit"> Request Access </button>
		</form>
		<a class="login" href="/login">Login</a>

		<div class="spacer" />

		<Footer />
	</div>

	<div class="pictureArea">
		<img class="picture" src="loginPicture.jpg" alt="Italian Trulli" />
	</div>
</div>

<style>
	.areaContainer {
		display: flex;
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
	.login {
		color: var(--accent-color);
		padding-top: 0.5rem;
		text-decoration: none;
	}
</style>
