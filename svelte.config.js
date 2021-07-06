import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',
		// deployment adapter using node
		adapter: node({}),
	}
};

export default config;
