<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    /*******************************************/

    import { postData, getData, capitalizeFirstLetter } from "../../lib";
    import { goto } from "@sapper/app";
    import Button from "../common/Button.svelte";

    $: BACKEND_URL = $session.BACKEND_URL;
    $: user = $session.user;

    async function execute() {
        if (BACKEND_URL === undefined) {
            alert("UNDEFINED DU HS");
            return;
        }

        console.log({ BACKEND_URL, user });

        if (user) {
            const url = BACKEND_URL + "/users/" + user.id + "/logout";

            let response = await postData(url, user);

            if (response.ok) {
                console.log(user.name + " logged out successfully!");
            } else {
                console.log("Error while logging out " + user.name);
            }

            $session.user = undefined;
            goto("/login", { replaceState: true });
        }
    }
</script>

<Button title="Logout" on:click={execute} />
