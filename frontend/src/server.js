require("dotenv").config();
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import authChecker from "./middleware/authChecker";
import cookieParser from "cookie-parser";
const {
	PORT,
	NODE_ENV,
	npm_package_version,
	TOKEN_SECRET,
	PROTOCOL_PREFIX,
	BACKEND_DOMAIN,
	BACKEND_PORT,
} = process.env;
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
					version: npm_package_version,
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
