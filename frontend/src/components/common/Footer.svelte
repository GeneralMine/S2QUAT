<script>
    /********************************************
     * Getting env variables from session store */
    import { stores } from "@sapper/app";
    const { session } = stores();
    $: version = $session.version;
    /*******************************************/
</script>

<div class="container">
    <a class="version" href="https://github.com/GeneralMine/S2QUAT-Landing">v{version}</a>
    <div class="linkContainer">
        <a href="impressum">Impressum</a>
        <a href="privacy">Datenschutz</a>
        <a href="about">Über uns</a>
    </div>
    <p class="copyright">© 2021 Fraunhofer IAO - Nobelstraße 12, 70569 Stuttgart</p>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 3.125rem;
        padding-bottom: 0rem;
        align-items: center;
    }
    .linkContainer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 0.75rem;
        line-height: 1.15;
        text-align: center;
    }
    a {
        padding-left: 1rem;
        padding-right: 1rem;
        text-decoration: none;
        color: #2e5bff;
        font-size: 0.75rem;
        line-height: 1.15;
    }
    .copyright {
        color: rgba(0, 0, 0, 0.8);
        font-size: 0.75rem;
        line-height: 1.15;
    }
    .version {
        font-size: 1rem;
    }
</style>
