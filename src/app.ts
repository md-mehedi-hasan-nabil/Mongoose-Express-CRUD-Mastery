import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan"
import userRoutes from "./app/modules/user/user.routes"

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// application routes
app.use("/api", userRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

export default app;