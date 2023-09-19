import express from "express";
import routes from "./routes/index";
const app = express();
const PORT = 3000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});

export default app;
