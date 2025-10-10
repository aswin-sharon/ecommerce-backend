import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your src folder (where feature modules live)
const modulesPath = path.resolve(__dirname, "../");

// Folders to skip (non-feature folders)
const skipFolders = ["config", "routes", "utils", "middlewares"];

// Read all folders in src/
const folders = fs.readdirSync(modulesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !skipFolders.includes(dirent.name))
    .map(dirent => dirent.name);

// Dynamically import routes for each feature folder
for (const folder of folders) {
    try {
        console.log("=======", folder);
        console.log("Importing route:", path.resolve(__dirname, `../${folder}/${folder}Routes.js`));

        // Relative path to route file
        const routePath = `../${folder}/${folder}Routes.js`;
        const module = await import(routePath);
        router.use(`/${folder}`, module.default);
        console.log(`Loaded routes for module: ${folder}`);
    } catch (err) {
        console.error(`Failed to load routes for module: ${folder}`, err.message);
    }
}

export default router;
