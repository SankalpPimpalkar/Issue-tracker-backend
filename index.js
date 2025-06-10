import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./constants.js";
import CONNECT_MONGO from "./src/db/config.js";

const app = express()

// DB CONNECTION
CONNECT_MONGO()

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: '*' }))

// ROUTES
app.get("/", (_, res) => {
	res.json({
		success: true,
		message: "OPUS.AI backend is running",
	});
});

// LISTENING
app.listen(PORT, () => {
    console.log('Server is listening at PORT: ', PORT)
})