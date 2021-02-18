<script context="module">
    export async function preload({ params }, { user }) {
        if (user) {
            this.redirect(302, `/`);
        }
    }
</script>

<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: BACKEND_URL = $session.BACKEND_URL;
    /*******************************************/

    import TextField from "../components/common/TextField.svelte";
    import Button from "../components/common/Button.svelte";
    import { postData, getData, capitalizeFirstLetter } from "../lib";
    import { goto } from "@sapper/app";
    import Footer from "../components/common/Footer.svelte";

    let name;
    let password;

    $: err = "";

    $: url = BACKEND_URL + "/users/login";

    async function loginHandler() {
        console.log("Trying to login at " + url);
        err = "";
        const response = await postData(url, {
            name,
            password,
        });

        switch (response.status) {
            case 200:
                // OK
                const { user } = await response.json();
                $session.user = user;
                console.log("User logged in:", user);
                goto("/", { replaceState: true });
                break;
            case 400:
                err = "Bad request!";
                break;
            case 401:
                // Unauthorized
                err = "Your credentials aren't matching!";
                break;
            case 403:
                // Forbidden
                err = "Your not verified yet";
                break;
            case 410:
                // GONE
                err = "Your account has been deactivated. Please contact the administrator at s2quat@raiser.dev";
                break;
            default:
                err = "Unknown error, please contact the admin at s2quat@raiser.dev with status code: " + response.status;
                break;
        }
    }

    function username_enter(ev) {
        if (isEnter(ev)) {
            document.getElementById("password").focus();
        }
    }

    function password_enter(ev) {
        if (isEnter(ev)) {
            loginHandler();
        }
    }

    function isEnter(ev) {
        return ev.keyCode === 13;
    }
</script>

<svelte:head>
    <title>Login - S2QUAT</title>
</svelte:head>

<div class="areaContainer">
    <div class="loginArea">
        <div class="spacer" />

        <div class="logo">
            <img class="logoPicture" src="logo-width.png" alt="S2QUAT Logo" />
        </div>
        <h2>Login</h2>
        <h4>Please enter your credentials</h4>
        <br />
        <form>
            <div class="field">
                <TextField id="username" label="Username" type="text" placeholder="Max1337" on:keyup={username_enter} bind:value={name} />
            </div>
            <div class="field">
                <TextField id="password" label="Password" type="password" placeholder="Max1337" on:keyup={password_enter} bind:value={password} />
            </div>
            <div class="button">
                <Button title="Login" on:click={loginHandler} />
            </div>
        </form>
        {#if err !== ""}
            <div class="errorbox">{err}</div>
        {/if}
        <p>New here? <a href="/register">Register here</a></p>

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
    .errorbox {
        border-color: red;
        border-width: 2px;
        border-radius: 20px;
    }
    .field {
        padding-top: 0.5em;
    }
    .button {
        padding-top: 1em;
    }
    .spacer {
        flex: 1;
    }
</style>
