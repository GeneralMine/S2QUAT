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

    let name;
    let email;
    let password;

    $: url = BACKEND_URL + "/users";

    async function registerHandler() {
        console.log("Trying to register at " + url);
        const response = await (
            await postData(url, {
                name,
                email,
                password,
            })
        ).json();
        if (response.ok) {
            console.log("Registration successful!");
        } else {
            console.error("Error at backend while register");
        }
        goto("/login", { replaceState: true });
    }

    function username_enter(ev) {
        if (isEnter(ev)) {
            document.getElementById("email").focus();
        }
    }

    function email_enter(ev) {
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
    <title>Register - S2QUAT</title>
</svelte:head>

<div class="areaContainer">
    <div class="loginArea">
        <h2>Register</h2>
        <h4>Please enter your credentials</h4>
        <br />
        <form>
            <TextField id="username" label="Username" type="text" placeholder="Max1337" on:keyup={username_enter} bind:value={name} />
            <TextField id="email" label="Email" type="text" placeholder="test@example.com" on:keyup={email_enter} bind:value={email} />
            <TextField id="password" label="Password" type="password" on:keyup={password_enter} bind:value={password} />
            <Button title="Register" on:click={registerHandler} />
        </form>
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
    .pictureArea {
        flex: 5;
        height: 100vh;
    }
    .picture {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
</style>
