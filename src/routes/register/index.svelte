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
	import { post } from '$lib/utils/api.js';
	import Footer from '$lib/Common/Footer.svelte';
	import ListErrors from '$lib/Layout/ListErrors.svelte';

	let name = '';
	let email = '';
	let password = '';
	let errors = null;
	let disabled = false;
	let width;

	async function submit(event) {
		console.log('Try to register...');
		disabled = true;

		let response;
		try {
			response = await post(`register/register`, { name, email, password });
			if (response.id) {
				console.log('Successfully registered as user', response.id);
				errors = {};
				errors[''] = 'Please wait until an admin has approved your request!';
			} else {
				console.log('Registration wasnt successfull!', response);
				errors = null;
				disabled = false;
			}
		} catch (error) {
			errors = response !== undefined && response.errors !== undefined ? response.errors : {};
			errors[''] = error;
			disabled = false;
		}
	}
</script>

<svelte:window bind:innerWidth={width} />

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
			<input id="fpassword" type="password" required placeholder="not123456" bind:value={password} />

			<button {disabled} type="submit"> Request Access </button>
		</form>
		<a class="login" href="/login">Login</a>

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
	.login {
		color: var(--accent-color);
		padding-top: 0.5rem;
		text-decoration: none;
	}
</style>
