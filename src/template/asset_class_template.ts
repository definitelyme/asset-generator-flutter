"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetClassTemplate = void 0;
const base_1 = require("./base");
class AssetClassTemplate extends base_1.Base {
  constructor(fileName, classes, variables) {
    super(fileName, classes, variables);
    let newline = `
`;
    this._dartString = `
class ${this.className} {
  const ${this.className}._();
  ${classes.length === 0 ? '' : newline + this.getClasses}
  ${variables.length === 0 ? '' : newline + this.getVariables}
}
`;
  }
  get dartString() {
    return this._dartString;
  }
  get demoString() {
    return `
class BaseAssets {
  BaseAssets._();
}
    `;
  }
}
exports.AssetClassTemplate = AssetClassTemplate;
//# sourceMappingURL=asset_class_template.js.map
