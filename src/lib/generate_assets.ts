"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetnerateAssets = void 0;
const _path = require("path");
const _ = require("lodash");
const _yaml_helper_1 = require("../utils/yaml_helper");
const _file_system_manager_1 = require("../utils/file_system_manager");
const _asset_class_template_1 = require("../template/asset_class_template");
const _generate_config_1 = require("./generate_config");
const _vs_code_actions_1 = require("../utils/vs_code_actions");
// https://flutter.dev/docs/development/ui/assets-and-images#asset-variants
class GetnerateAssets {
    errorList: string[];
    listErrorFileNames: string[];

    constructor() {
        // private assetsMap = new Map<string, any>([]);
        this.errorList = [];
        this.listErrorFileNames = [];
    }
    generate() {
        // read pubspec.yaml in JSON data
        let json = _yaml_helper_1.YamlHelper.getPubspecJsonFile();
        if (json === undefined) {
            return 'Invalid Pubspec format';
        }
        let object = JSON.parse(json);
        let assets = object['flutter']['assets'];
        if (typeof (assets) === undefined) {
            return 'Asset not found';
        }
        let pathFiles = this.pathFilesFromAssets(assets);
        console.log(pathFiles);
        var result = this.mapPathfilesToJSON(pathFiles);
        var classes = Object.keys(result)
            .map((key) => {
                return (new _asset_class_template_1.AssetClassTemplate(key, result[key].classes, result[key].variables)).dartString;
            }).join('');
        classes += this.errorList.map((e) => '\n// ' + e).join('');
        let config = _generate_config_1.GenerateConfig.readConfigFileAsJSON();
        var outputPath = 'lib';
        var filename = 'assets.dart';
        if (config !== undefined && (config['assets'])) {
            if ((config['assets']['output-path'])) {
                let rs = config['assets']['output-path'];
                if (!_.isEmpty(rs)) {
                    outputPath = rs;
                }
            }
            if ((config['assets']['filename'])) {
                let rs = config['assets']['filename'];
                if (!_.isEmpty(rs)) {
                    filename = rs;
                }
            }
        }
        if (!_file_system_manager_1.FileSystemManager.createFolder(_path.join(_vs_code_actions_1.VsCodeActions.rootPath, outputPath), true)) {
            _vs_code_actions_1.VsCodeActions.showErrorMessage(`Can't create output at '${_path.join(outputPath, filename)}'`);
            return;
        }
        // console.log(classes);
        _file_system_manager_1.FileSystemManager.createFile(_path.join(_vs_code_actions_1.VsCodeActions.rootPath, outputPath), filename, classes, true);
        _vs_code_actions_1.VsCodeActions.showInformationMessage('File: \'' + _path.join(outputPath, filename) + '\' is generated.');
    }
    // Get path of files for all assets that list in pubspec.yaml, result will be unique path in lowerCase
    pathFilesFromAssets(assets) {
        var pathFiles = [];
        var listAssetError = [];
        for (var i in assets) {
            var filePaths = this.pathFilesFromAsset(assets[i]);
            if (typeof (filePaths) === 'string') {
                listAssetError.push(filePaths);
            }
            else {
                pathFiles = pathFiles.concat(filePaths);
            }
        }
        if (listAssetError.length !== 0) {
            this.errorList = this.errorList
                .concat(['', 'Asset path not exist:', '']
                    .concat(listAssetError));
        }
        return Array.from(new Set(pathFiles))
            .sort();
    }
    // Get path of files for each asset that list in pubspec.yaml
    pathFilesFromAsset(asset) {
        let assetPath = _path.join(_vs_code_actions_1.VsCodeActions.rootPath, asset);
        let isExist = _file_system_manager_1.FileSystemManager.doesFileExist('', assetPath);
        if (!isExist) {
            return asset;
        }
        var pathFiles = [];
        // Check asset is whether file or folder
        if (_file_system_manager_1.FileSystemManager.isFolder(assetPath)) {
            // List all File & Folder in asset folder, if it is folder then call recursive all sub folder to get all file.
            // result is a file name or folder name so it had to join with asset _path.
            _file_system_manager_1.FileSystemManager.listFiles(assetPath)
                .map((resultPath) => _path.join(asset, resultPath))
                .forEach((finalPath) => {
                    if (_file_system_manager_1.FileSystemManager.isFolder(_path.join(_vs_code_actions_1.VsCodeActions.rootPath, finalPath))) {
                        pathFiles = pathFiles.concat(this.pathFilesFromAsset(finalPath));
                    }
                    else {
                        pathFiles.push(finalPath);
                    }
                });
        }
        else {
            pathFiles.push(asset);
        }
        return pathFiles;
    }
    mapPathfilesToJSON(pathFiles) {
        // Use JSON to keep hierachy of classes
        var classJson = JSON.parse('{}');
        for (let k1 = 0; k1 < pathFiles.length; k1++) {
            let pathFile = pathFiles[k1];
            let parts = pathFile.split('/');
            let pathParts = parts.slice(0, parts.length - 1);
            let filename = parts[parts.length - 1];
            if (!filename.includes('.') || filename.match(/(^\.)/gm) || pathParts.length === 0) {
                continue;
            }
            let variableName = this.formatVariable(pathFiles[k1], filename);
            if (variableName === undefined) {
                continue;
            }
            for (let k2 = 0; k2 < pathParts.length; k2++) {
                let key = pathParts.slice(0, k2 + 1).join('/');
                if (!(classJson[key])) {
                    classJson[key] = { "classes": [], "variables": [] };
                }
                if (k2 === 0) {
                    continue;
                }
                let previousKey = k2 === 1 ? pathParts[0] : pathParts.slice(0, k2).join('/');
                classJson[previousKey].classes.push(key);
            }
            classJson[pathParts.join('/')].variables.push([variableName, pathFile]);
        }
        if (this.listErrorFileNames.length !== 0) {
            this.errorList = this.errorList
                .concat(['', 'Files format error:', '']
                    .concat(this.listErrorFileNames));
        }
        // console.log(JSON.stringify(classJson));
        return classJson;
    }
    formatVariable(pathFile, filename) {
        // console.log(part);
        // Convert filename to camelCase variable name.
        var filenames = filename.split('.');
        if (filenames.length !== 2 || filenames[0] === '' || filename.match(/(^[0-9])/gm)) {
            this.listErrorFileNames.push(pathFile);
            console.log('File format error: ' + filename);
            return;
        }
        var name = filenames[0];
        // .replace(/([a-z][A-Z])/g, (x) => x.replace(/[A-Z]/g, (y) => ' ' + y));
        name = _.camelCase(name)
            // .replace(/(_[a-z])|(-[a-z])/g, (x) => x.replace(/[\_\-]/g, '').toUpperCase())
            // .replace(/[\.][a-z]*/g, (x) => x.replace('.', '').toUpperCase())
            .replace(/[^A-z0-9]/g, '')
            .trim();
        if (name === '') {
            this.listErrorFileNames.push(pathFile);
            console.log('File format error: ' + filename);
            return;
        }
        var variableName = (name + _.upperCase(filenames[1])).replace(/ /g, '');
        // .replace(/(_[a-z])|(-[a-z])/g, (x) => x.replace(/[\_\-]/g, '').toUpperCase())
        // .replace(/[\.][a-z]*/g, (x) => x.replace('.', '').toUpperCase())
        // .replace(/[^A-z0-9]/g, '');
        // console.log(variableName);
        return variableName;
    }
}
exports.GetnerateAssets = GetnerateAssets;
//# sourceMappingURL=generate_assets.js.map
