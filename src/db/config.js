import mongoose from "mongoose";
import { MONGO_URL,NODE } from "../../constants.js";

function CONNECT_MONGO() {
	mongoose
		.connect(MONGO_URL)
		.then(() => {
			console.log("🍀 MONGODB Connected!!");
		})
		.catch((error) => {
			console.log("❌ MONGODB Connection Failed!!", error.message);
		});
}

export default CONNECT_MONGO;