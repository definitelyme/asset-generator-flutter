"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamlHelper = void 0;
const yaml = require("js-yaml");
const __vs_code_actions_1 = require("./vs_code_actions");
const __file_system_manager_1 = require("./file_system_manager");
class YamlHelper {
    // public static initializeWithDependencies() {
    // this.upgradeDartVersion();
    // this.addDependencyToPubspec('provider_architecture', '1.0.3');
    // this.addDependencyToPubspec('responsive_builder', '0.1.4');
    // this.addDependencyToPubspec('provider', '3.2.0');
    // this.addDependencyToPubspec('logger', '0.7.0+2');
    // this.addDependencyToPubspec('get_it', '3.0.3');
    // this.addDependencyToPubspec('equatable', '1.0.1');
    // this.addAssetComment();
    // }
    static isValidFlutterPubspec() {
        let json = this.getPubspecJsonFile();
        if (json === undefined) {
            return 'Invalid Pubspec format';
        }
        let object = JSON.parse(json);
        if (object['environment'] === undefined) {
            return 'No environment definition found';
        }
        if (object['dependencies'] === undefined) {
            return 'Definition for dependencies not found';
        }
        if (object['dependencies']['flutter'] === undefined) {
            return 'Definition for FLutter in dependencies not found';
        }
        return undefined;
    }
    static getProjectName() {
        let json = this.getPubspecJsonFile();
        if (json === undefined) {
            return undefined;
        }
        let object = JSON.parse(json);
        return object['name'];
    }
    static addDependencyToPubspec(module, version) {
        let json = this.getPubspecJsonFile();
        if (json === undefined) {
            return;
        }
        let object = JSON.parse(json);
        object['dependencies'][module] = `^${version}`;
        let modifiedString = JSON.stringify(object);
        console.debug(`addDependencyToPubspec: modifiledString: ${modifiedString}`);
        let updatedYaml = this.toYAML(modifiedString);
        if (updatedYaml === undefined) {
            return;
        }
        this.overwritePubspecFile(updatedYaml);
    }
    static upgradeDartVersion() {
        let json = this.getPubspecJsonFile();
        if (json === undefined) {
            return;
        }
        let object = JSON.parse(json);
        object['environment']['sdk'] = '>=2.3.0 <3.0.0';
        let modifiedString = JSON.stringify(object);
        console.debug(`upgradeDartVersion: modifiledString: ${modifiedString}`);
        let updatedYaml = this.toYAML(modifiedString);
        if (updatedYaml === undefined) {
            return;
        }
        this.overwritePubspecFile(updatedYaml);
    }
    static addAssetComment() {
        let json = this.getPubspecJsonFile();
        if (json === undefined) {
            return;
        }
        let object = JSON.parse(json);
        let modifiedString = JSON.stringify(object);
        let updatedYaml = this.toYAML(modifiedString);
        if (updatedYaml === undefined) {
            return;
        }
        updatedYaml += `\n\n
  # To add assets to your application, add an assets section, like this:
  # assets:
  #  - images/a_dot_burr.jpeg
  #  - images/a_dot_ham.jpeg

  # An image asset can refer to one or more resolution-specific "variants", see
  # https://flutter.dev/assets-and-images/#resolution-aware.

  # For details regarding adding assets from package dependencies, see
  # https://flutter.dev/assets-and-images/#from-packages

  # To add custom fonts to your application, add a fonts section here,
  # in this "flutter" section. Each entry in this list should have a
  # "family" key with the font family name, and a "fonts" key with a
  # list giving the asset and other descriptors for the font. For
  # example:
  # fonts:
  #   - family: Schyler
  #     fonts:
  #       - asset: fonts/Schyler-Regular.ttf
  #       - asset: fonts/Schyler-Italic.ttf
  #         style: italic
  #   - family: Trajan Pro
  #     fonts:
  #       - asset: fonts/TrajanPro.ttf
  #       - asset: fonts/TrajanPro_Bold.ttf
  #         weight: 700
  #
  # For details regarding fonts from package dependencies,
  # see https://flutter.dev/custom-fonts/#from-packages`;
        this.overwritePubspecFile(updatedYaml);
    }
    static getPubspecJsonFile() {
        let rootPath = __vs_code_actions_1.VsCodeActions.rootPath;
        let fileData = __file_system_manager_1.FileSystemManager.readFileAsString(rootPath, 'pubspec.yaml');
        if (fileData === undefined) {
            console.debug('Pubspec.yaml not found');
            return undefined;
        }
        let data = YamlHelper.toJSON(fileData);
        return data;
    }
    static overwritePubspecFile(data) {
        __file_system_manager_1.FileSystemManager.createFile(__vs_code_actions_1.VsCodeActions.rootPath, 'pubspec.yaml', data);
    }
    static toYAML(text) {
        let json;
        try {
            console.debug(`toYAML: ${text}`);
            json = JSON.parse(text);
        }
        catch (e) {
            __vs_code_actions_1.VsCodeActions.showErrorMessage('Could not parse the selection as JSON.');
            console.error(e);
            return undefined;
        }
        return yaml.dump(json, { indent: this.getIndent() });
    }
    static toJSON(text) {
        let json;
        try {
            console.debug(`toJSON: ${text}`);
            json = yaml.load(text, { schema: yaml.JSON_SCHEMA });
        }
        catch (e) {
            __vs_code_actions_1.VsCodeActions.showErrorMessage('Could not parse the selection as YAML.');
            console.error(e);
            return;
        }
        return JSON.stringify(json, null, this.getIndent());
    }
    static getIndent() {
        const editorCfg = __vs_code_actions_1.VsCodeActions.getEditorConfiguration();
        if (editorCfg && editorCfg.get('insertSpaces')) {
            const tabSize = editorCfg.get('tabSize');
            if (tabSize && typeof tabSize === 'number') {
                return tabSize;
            }
        }
        return 2;
    }
}
exports.YamlHelper = YamlHelper;
//# sourceMappingURL=yaml_helper.js.map
