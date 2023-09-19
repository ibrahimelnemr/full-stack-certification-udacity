import express from "express";
import path from "path";

import { validateImg, checkForResizedImg, createResizedImg } from "../../utils";

const ImgRoute = express.Router();
ImgRoute.get(
  "/",

  async (req: express.Request, res: express.Response) => {
    const filename = req.query.filename as string;

    let width: number | string = req.query.width as string;

    let height: number | string = req.query.height as string;

    width = Number(width);

    height = Number(height);

    if (Number.isNaN(width)) {
      width = 0;
    }
    if (Number.isNaN(height)) {
      height = 0;
    }

    console.log(`Filename: ${filename}, Width: ${width}, Height: ${height}`);

    const errmessages = [
      "Invalid width value.",
      "Invalid height value.",
      "Image requested does not exist.",
      "No height provided.",
      "No width provided.",
      "No filename provided.",
    ];

    const imageValidated: string = await validateImg(filename, width, height);

    console.log(imageValidated);

    if (errmessages.includes(imageValidated)) {
      res.send(imageValidated);
      return;
    }
    const resizedImgExists: boolean = await checkForResizedImg(
      filename,
      width,
      height,
    );
    if (resizedImgExists) {
      console.log("Resized image already exists.");
      res.sendFile(
        path.resolve("images", "thumb", `${filename}${width}x${height}.jpeg`),
      );
      return;
    }

    console.log("Resizing image");

    const resizedImgPath = path.resolve(
      "images",
      "thumb",
      `${filename}${width}x${height}.jpeg`,
    );

    await createResizedImg(filename, width, height, resizedImgPath);

    try {
      res.sendFile(resizedImgPath);
    } catch (err) {
      console.log(err);
    }
  },
);

export default ImgRoute;
