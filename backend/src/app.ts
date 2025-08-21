import express from "express";
import routes from "./routes";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => res.send("API MVC Mock 🚀"));
app.use("/api", routes);

export default app;
