import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";

// check if width, height, filename is valid

export const validateImg = async (
  filename: string,
  width: number,
  height: number,
): Promise<string> => {
  if (filename === undefined) {
    return "No filename provided.";
  }

  if (Number.isNaN(width)) {
    return "No width provided.";
  }

  if (Number.isNaN(height)) {
    return "No height provided.";
  }

  // check if width is valid value

  if (width <= 0) {
    // return false;
    return "Invalid width value.";
  }

  // check if height is valid value

  if (height <= 0) {
    // return false;
    return "Invalid height value.";
  }

  // check if original image file exists
  const fullImgPath = path.join("images", "full", `${filename}`);

  try {
    await fs.access(fullImgPath);
    //return true;
    return "Success.";
  } catch {
    // return false;
    return "Image requested does not exist.";
  }
};

// check if resized image file exists

export const checkForResizedImg = async (
  filename: string,
  width: number,
  height: number,
): Promise<boolean> => {
  const resizedImgPath = path.join(
    "images",
    "thumb",
    `${filename}${width}x${height}.jpeg`,
  );

  // check if the thumbnail filename with given width and height already exists
  try {
    await fs.access(resizedImgPath);
    return true;
  } catch {
    return false;
  }
};

export const createResizedImg = async (
  filename: string,
  width: number,
  height: number,
  filepath: string,
): Promise<void> => {
  // create the image
  try {
    await sharp(path.join("images", "full", filename))
      .resize(width, height)
      .toFormat("jpeg")
      .toFile(filepath);
  } catch (err) {
    console.log(err);
  }
};
