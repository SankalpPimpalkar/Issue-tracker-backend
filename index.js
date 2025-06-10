import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./constants.js";
import CONNECT_MONGO from "./src/db/config.js";
import authRouter from "./src/routes/auth.route.js";
import bucketRouter from "./src/routes/bucket.route.js";
import issueRouter from "./src/routes/issue.route.js";

const app = express()

// DB CONNECTION
CONNECT_MONGO()

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
	origin: "*",
	credentials: true
}))

// ROUTES
app.get("/", (_, res) => {
	console.log("GOOO")
	return res
		.status(200)
		.json({
			success: true,
			message: "backend is running",
		});
});
app.use("/api/auth", authRouter);
app.use("/api/bucket", bucketRouter);
app.use("/api/issue", issueRouter);

// LISTENING
app.listen(PORT, () => {
	console.log('Server is listening at PORT:', PORT)
})