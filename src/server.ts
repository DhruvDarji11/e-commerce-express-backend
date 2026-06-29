// import dotenv from "dotenv";
import cors from "cors";
import express, { Express } from "express";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";
import { errorMiddleware } from "./middleware/error.middleware";
// Routes
import ProductRoutes from "./routes/product.routes";
import AuthRoutes from "./routes/auth.routes";
const app: Express = express();

app.use(cors());
// Choose a runtime port
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true }));
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,

    message: "Server is running",
  });
});
app.use("/api/auth", AuthRoutes);
app.use("/api/product", ProductRoutes);

// Global error middleware
app.use(errorMiddleware);

const startServer = async () => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log("App running on PORT:", env.PORT);
  });
};
startServer();
