import dotenv from "dotenv";
let ENV_URL = "./.env.prod";

switch (process.env.NODE_ENV) {
	case "DEV":
		ENV_URL = "./.env.dev";
		break;
	case "RELEASE":
		ENV_URL = "./.env";
		break;
	default:
		ENV_URL = "./.env.prod";
		break;
}

dotenv.config({ path: ENV_URL });

export const NODE = process.env.NODE
export const PORT = process.env.PORT
export const MONGO_URL = process.env.MONGO_URL
export const JWT_SECRET = process.env.JWT_SECRET