"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateConfig = void 0;
const file_system_manager_1 = require("../utils/file_system_manager");
const vs_code_actions_1 = require("../utils/vs_code_actions");
class GenerateConfig {
    static get filename() {
        return '.flutgenrc';
    }
    static generate() {
        let result = file_system_manager_1.FileSystemManager.readFileAsString('src/template', this.filename);
        if (result === undefined) {
            return `Can't generate config file`;
        }
        file_system_manager_1.FileSystemManager.createFile(vs_code_actions_1.VsCodeActions.rootPath, this.filename, result, true);
        vs_code_actions_1.VsCodeActions.showInformationMessage('File: \'' + this.filename + '\' is generated.');
    }
    static readConfigFileAsJSON() {
        let result = file_system_manager_1.FileSystemManager.readFileAsString(vs_code_actions_1.VsCodeActions.rootPath, this.filename);
        if (result === undefined) {
            return;
        }
        return JSON.parse(result);
    }
}
exports.GenerateConfig = GenerateConfig;
//# sourceMappingURL=generate_config.js.map