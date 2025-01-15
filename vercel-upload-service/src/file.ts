import { readdirSync, statSync } from "fs";
import { join } from "path";

export function getAllFilePaths(directoryPath: string): string[] {
  const fileArray: string[] = [];

  try {
    const files = readdirSync(directoryPath);

    files.forEach((file) => {
      const fullPath = join(directoryPath, file);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        // Recursively get files from subdirectories
        fileArray.push(...getAllFilePaths(fullPath));
      } else {
        // Add file path to array
        fileArray.push(fullPath);
      }
    });
  } catch (error) {
    console.error("Error reading directory:", error);
  }

  return fileArray;
}

// Usage example:
// const files = getAllFilePaths('./your/directory/path');
// console.log(files);
