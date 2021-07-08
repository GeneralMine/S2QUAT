import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',
		// deployment adapter using node
		adapter: node({}),
		vite: {
			define: {
				__APP_VERSION__: process.env["npm_package_version"],
			}
		}
	}
};

export default config;
