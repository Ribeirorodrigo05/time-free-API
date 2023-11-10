import express from "express";
const app = express();
const port = 3000;
import { router } from "./routes/routes";
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);
// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
