import express from "express";
export const app = express();
const port = 3000;
import { router } from "./routes/routes";
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);
// Start server
app.listen(port, () => {
  process.stdout.write(`Server running on port ${port}`);
});
