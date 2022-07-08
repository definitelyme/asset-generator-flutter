"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VsCodeActions = void 0;
const vscode_1 = require("vscode");
const lodash1 = require("lodash");
class VsCodeActions {
    /**
     * Accepts an input string in the current Vscode context
     * @param placeHolder The placeholder string to display in the input box
     * @param validateInput The function to validate if the text entered in the input box is of a valid format or not
     */
    static getInputString(placeHolder, validateInput) {
        return __awaiter(this, void 0, void 0, function* () {
            let input = yield vscode_1.window.showInputBox({
                placeHolder: placeHolder,
                validateInput: validateInput,
            });
            if (input === undefined) {
                return "";
            }
            return input;
        });
    }
    /**
     * Get the root path of the current context
     */
    static get rootPath() {
        let rootPath = vscode_1.workspace.workspaceFolders[0].uri.fsPath;
        if (lodash1.isUndefined(rootPath)) {
            return '';
        }
        return rootPath;
    }
    /**
     * Display an error message in the current VsCode context
     * @param message The message to display
     */
    static showErrorMessage(message) {
        vscode_1.window.showErrorMessage(message);
    }
    /**
     * Display an information message in the current VsCode context
     * @param message The message to display
     */
    static showInformationMessage(message) {
        vscode_1.window.showInformationMessage(message);
    }
    static getEditorConfiguration() {
        let configuration = vscode_1.workspace.getConfiguration('editor');
        return configuration;
    }
}
exports.VsCodeActions = VsCodeActions;
//# sourceMappingURL=vs_code_actions.js.map
