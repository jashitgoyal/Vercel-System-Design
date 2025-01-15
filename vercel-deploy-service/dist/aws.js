"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadS3Folder = downloadS3Folder;
exports.copyFinalDist = copyFinalDist;
const aws_sdk_1 = require("aws-sdk");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const s3 = new aws_sdk_1.S3({
  region: process.env.REGION, // Replace with your region
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
});
function downloadS3Folder(prefix) {
  return __awaiter(this, void 0, void 0, function* () {
    var _a;
    const allFiles = yield s3
      .listObjectsV2({
        Bucket: "jashit-vercel",
        Prefix: prefix,
      })
      .promise();
    console.log(allFiles);
    const allPromises =
      ((_a = allFiles.Contents) === null || _a === void 0
        ? void 0
        : _a.map((_a) =>
            __awaiter(this, [_a], void 0, function* ({ Key }) {
              return new Promise((resolve) =>
                __awaiter(this, void 0, void 0, function* () {
                  if (!Key) {
                    resolve("");
                    return;
                  }
                  console.log(Key);
                  const finalOutputPath = path_1.default.join(__dirname, Key);
                  const outputFile =
                    fs_1.default.createWriteStream(finalOutputPath);
                  const dirName = path_1.default.dirname(finalOutputPath);
                  if (!fs_1.default.existsSync(dirName)) {
                    fs_1.default.mkdirSync(dirName, { recursive: true });
                  }
                  s3.getObject({
                    Bucket: "jashit-vercel",
                    Key,
                  })
                    .createReadStream()
                    .pipe(outputFile)
                    .on("finish", () => {
                      resolve("");
                    });
                })
              );
            })
          )) || [];
    console.log("awaiting");
    yield Promise.all(
      allPromises === null || allPromises === void 0
        ? void 0
        : allPromises.filter((x) => x !== undefined)
    );
  });
}
function copyFinalDist(id) {
  const folderPath = path_1.default.join(__dirname, `output/${id}/dist`);
  const allFiles = getAllFiles(folderPath);
  allFiles.forEach((file) => {
    uploadFile(`dist/${id}/` + file.slice(folderPath.length + 1), file);
  });
}
const getAllFiles = (folderPath) => {
  let response = [];
  const allFilesAndFolders = fs_1.default.readdirSync(folderPath);
  allFilesAndFolders.forEach((file) => {
    const fullFilePath = path_1.default.join(folderPath, file);
    if (fs_1.default.statSync(fullFilePath).isDirectory()) {
      response = response.concat(getAllFiles(fullFilePath));
    } else {
      response.push(fullFilePath);
    }
  });
  return response;
};
const uploadFile = (fileName, localFilePath) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = fs_1.default.readFileSync(localFilePath);
    const response = yield s3
      .upload({
        Body: fileContent,
        Bucket: "jashit-vercel",
        Key: fileName,
      })
      .promise();
    console.log(response);
  });
