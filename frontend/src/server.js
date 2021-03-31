require("dotenv").config();
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import authChecker from "./middleware/authChecker";
import cookieParser from "cookie-parser";

// env
const PORT = process.env.PORT || "3000";
const NODE_ENV = process.env.NODE_ENV || "development";
const NPM_PACKAGE_VERSION = process.env.npm_package_version || "0.0.0";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "d3ac10209c78b071e9a00791904cabe21fe5f0fdc2a91a9a6b54ec0ebe2b8e8b275dc7c7579a85468e4abd7b1c18c38a0f8889668e9ec66cf58245bd5b0b665e";
const PROTOCOL_PREFIX = process.env.PROTOCOL_PREFIX || "http//";
const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || "localhost";
const BACKEND_PORT = process.env.BACKEND_PORT || "8080";

const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(cookieParser())
	.use(authChecker(TOKEN_SECRET))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => {
				return {
					user: req.user,
					version: NPM_PACKAGE_VERSION,
					PROTOCOL_PREFIX,
					BACKEND_DOMAIN,
					BACKEND_PORT,
					BACKEND_URL: PROTOCOL_PREFIX +
						BACKEND_DOMAIN +
						(BACKEND_DOMAIN.startsWith("localhost") ? ":" + BACKEND_PORT : "")
				}
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
