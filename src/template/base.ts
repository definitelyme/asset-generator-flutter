"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const lodash = require("lodash");
class Base {
    classNameValue;
    classes;
    variables;

    constructor(classNameValue, classes, variables) {
        this.classNameValue = classNameValue;
        this.classes = classes;
        this.variables = variables;
    }
    get isHead() {
        return !this.classNameValue.includes('/');
    }
    get className() {
        // let prefix = this.isHead ? '' : '_';
        let prefix = '';
        return prefix + this.getClassName(this.classNameValue);
    }
    getClassName(fileName) {
        let camelCaseString = lodash.camelCase(fileName);
        let className = this.convertStringToUpperCamelCase(camelCaseString);
        return className;
    }
    convertStringToUpperCamelCase(fileName) {
        let camelCaseString = lodash.camelCase(fileName);
        return lodash.upperFirst(camelCaseString);
    }
    get getClasses() {
        return Array.from(new Set(this.classes)).map((e) => `  ` + this.classVtemplate(e))
            .join(`
`);
    }
    classVtemplate(className) {
        let variableName = lodash.last(className.split('/'));
        let classVariable = lodash.camelCase(variableName);
        let classType = this.convertStringToUpperCamelCase(className);
        let staticText = this.isHead ? 'static ' : '';
        //   static final _GoogleApis googleApis = _GoogleApis._();
        return `static const ${classVariable} = ___${classType}._();`;
    }
    get getVariables() {
        return this.variables
            .map((value) => `  ` + this.variableVtemplate(value))
            .join(`
`);
        ;
    }
    variableVtemplate(paired) {
        // let camelName = lodash.camelCase(paired[0]);
        //   final ploy3173117526defcaa86JSON = 'assets/google_apis/ploy-317311-7526defcaa86.json';
        return `static const ${paired[0]} = '${paired[1]}';`;
    }
}
exports.Base = Base;
//# sourceMappingURL=base.js.map
