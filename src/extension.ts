"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const generate_assets_1 = require("./lib/generate_assets");
const generate_config_1 = require("./lib/generate_config");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log('Flutter Assets Generator: Activated');
    let disposableAssets = vscode.commands.registerCommand('assets-generator-flutter.assets', () => {
        let getnerateAssets = new generate_assets_1.GetnerateAssets();
        getnerateAssets.generate();
    });
    let disposableConfigFile = vscode.commands.registerCommand('assets-generator-flutter.default-config-file', () => {
        generate_config_1.GenerateConfig.generate();
    });
    context.subscriptions.push(disposableAssets);
    context.subscriptions.push(disposableConfigFile);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    console.debug('Flutter Assets Generator: Deactivated');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
