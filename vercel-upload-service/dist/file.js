"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFilePaths = getAllFilePaths;
const fs_1 = require("fs");
const path_1 = require("path");
function getAllFilePaths(directoryPath) {
    const fileArray = [];
    try {
        const files = (0, fs_1.readdirSync)(directoryPath);
        files.forEach((file) => {
            const fullPath = (0, path_1.join)(directoryPath, file);
            const stat = (0, fs_1.statSync)(fullPath);
            if (stat.isDirectory()) {
                // Recursively get files from subdirectories
                fileArray.push(...getAllFilePaths(fullPath));
            }
            else {
                // Add file path to array
                fileArray.push(fullPath);
            }
        });
    }
    catch (error) {
        console.error("Error reading directory:", error);
    }
    return fileArray;
}
// Usage example:
// const files = getAllFilePaths('./your/directory/path');
// console.log(files);
