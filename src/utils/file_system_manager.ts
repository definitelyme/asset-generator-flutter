"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemManager = void 0;
const fs = require("fs");
const path = require("path");
const ___vs_code_actions_1 = require("./vs_code_actions");
const yaml_helper_1 = require("./yaml_helper");
class FileSystemManager {
    static createFile(pathValue, fileName, data, overwrite = false) {
        let filePath = path.join(pathValue, fileName);
        if (overwrite) {
            this.deleteFileIfExist(filePath);
        }
        fs.writeFileSync(filePath, data);
    }
    static createFolder(pathValue, recursive = false) {
        pathValue = pathValue;
        if (!fs.existsSync(pathValue)) {
            try {
                fs.mkdirSync(pathValue, { recursive: recursive });
            }
            catch (error) {
                console.error(`Unable to create folder: ${error}`);
                return false;
            }
        }
        return true;
    }
    static deleteFileIfExist(pathValue) {
        if (fs.existsSync(pathValue)) {
            fs.rmSync(pathValue);
        }
    }
    static doesFileExist(filePath, fileName) {
        let pathFile = path.join(filePath, fileName);
        return fs.existsSync(pathFile);
    }
    static isFolder(pathFile) {
        return fs.lstatSync(pathFile).isDirectory();
    }
    static listFiles(folder) {
        return fs.readdirSync(folder);
    }
    static readFileAsString(filePath, fileName) {
        let pathToFile = path.join(filePath, fileName);
        if (!this.doesFileExist(filePath, fileName)) {
            return undefined;
        }
        let fileBuffer = fs.readFileSync(pathToFile);
        let fileData = fileBuffer.toString();
        return fileData;
    }
    static isFlutterProject() {
        let rootPath = ___vs_code_actions_1.VsCodeActions.rootPath;
        if (!fs.existsSync(path.join(rootPath, 'pubspec.yaml'))) {
            ___vs_code_actions_1.VsCodeActions.showErrorMessage('Pubspec.yaml not found');
            return false;
        }
        let errorMessage = yaml_helper_1.YamlHelper.isValidFlutterPubspec();
        console.error(errorMessage);
        if (errorMessage !== undefined) {
            ___vs_code_actions_1.VsCodeActions.showErrorMessage(errorMessage);
            return false;
        }
        return true;
    }
}
exports.FileSystemManager = FileSystemManager;
//# sourceMappingURL=file_system_manager.js.map
