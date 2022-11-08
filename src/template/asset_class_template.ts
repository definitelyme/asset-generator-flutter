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
class ___A_${this.className} {
  const ___A_${this.className}._();
${classes.length === 0 ? variables.length === 0 ? '' : newline + this.getVariables : newline + this.getClasses}
}
`;
  }
  get dartString() {
    return this._dartString;
  }
  get demoString() {
    return `
class Assets {
  Assets._();
}
    `;
  }
}
exports.AssetClassTemplate = AssetClassTemplate;
//# sourceMappingURL=asset_class_template.js.map
