# May be useful
<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,800,800i,900,900i"
		rel="stylesheet">

const PORT = process.env.PORT || "3000";
const NODE_ENV = process.env.NODE_ENV || "development";
const NPM_PACKAGE_VERSION = process.env.npm_package_version || "0.0.0";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "d3ac10209c78b071e9a00791904cabe21fe5f0fdc2a91a9a6b54ec0ebe2b8e8b275dc7c7579a85468e4abd7b1c18c38a0f8889668e9ec66cf58245bd5b0b665e";
const PROTOCOL_PREFIX = process.env.PROTOCOL_PREFIX || "http//";
const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || "localhost";
const BACKEND_PORT = process.env.BACKEND_PORT || "8080";


# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
