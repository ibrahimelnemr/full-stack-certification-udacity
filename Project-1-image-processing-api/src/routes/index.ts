import express from "express";
const routes = express.Router();
import CreateImgRoute from "./api/images";

// Default message - main route
routes.get("/", (req: express.Request, res: express.Response) => {
  res.send(
    "Welcome to this image resizing tool. Navigate to localhost:3000/api/images?filename=<filename>&width=<width>&height=<height> to use this API.",
  );
});

// Use ImgRouter for image API route
routes.use("/api/images", CreateImgRoute);

export default routes;
