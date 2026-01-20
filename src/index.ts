import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { connectDatabase } from "./database/mongodb";
import { PORT } from "./config";
import authRoutes from "./routes/auth.route";
import cors from 'cors';
const app: Application = express();


let corsOptions = {
    origin: ["http://localhost:3000","http://localhost:3003"],
    // list of domains allowed to access the server
    // frontend domain/url
    optionsSuccessStatus: 200,
    credentials: true,
}
// origin: "*" , // allow all domains
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ success: true, message: "Welcome to Digital Wallet API" });
});

async function startServer() {
    await connectDatabase();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

startServer();
