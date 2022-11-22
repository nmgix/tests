import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { UserRequest } from "../types/authTypes";
import path from "path";

type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorage = multer.diskStorage({
  destination: "upload",
  filename: (req: UserRequest, file: Express.Multer.File, callback: FileNameCallback): void => {
    callback(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname.replace(/ /g, ""));
  },
});

const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  const validFileTypes = /png|jpg|jpeg|gif|txt|md/;
  const validFormat = validFileTypes.test(path.extname(file.originalname).toLowerCase());
  if (validFormat === true) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter, limits: { fieldSize: 20000000 } }).fields([
  { name: "attachments" },
]);

export { fileStorage, fileFilter, upload };
