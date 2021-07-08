<footer class="footerContainer">
	<a class="version" href="https://github.com/GeneralMine/S2QUAT">__APP_VERSION__</a>
	<div class="linkContainer">
		<a href="impressum">Impressum</a>
		<a href="privacy">Datenschutz</a>
		<a href="about">Über uns</a>
	</div>
	<p class="copyright">© 2021 Fraunhofer IAO - Nobelstraße 12, 70569 Stuttgart</p>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		padding-bottom: 0;
		align-items: center;
		grid-area: footer;
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
