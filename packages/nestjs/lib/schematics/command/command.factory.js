"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const dist_1 = require("@nestjs/schematics/dist");
function main(options) {
    options = transform(options);
    return (tree, context) => {
        return schematics_1.branchAndMerge(schematics_1.chain([addDeclarationToModule(options), schematics_1.mergeWith(generate(options))]))(tree, context);
    };
}
exports.main = main;
function transform(source) {
    const target = Object.assign({}, source);
    target.metadata = 'providers';
    target.type = 'handler';
    if (!target.name) {
        throw new schematics_1.SchematicsException('Option (name) is required.');
    }
    target.name = core_1.strings.dasherize(source.name);
    target.path = core_1.strings.dasherize(source.path);
    target.path = core_1.join(target.path, target.name);
    return target;
}
function generate(options) {
    return (context) => {
        return schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter((path) => !path.endsWith('.spec.ts')),
            schematics_1.template(Object.assign(Object.assign({}, core_1.strings), options)),
            schematics_1.move(options.path),
        ])(context);
    };
}
function addDeclarationToModule(options) {
    return (tree) => {
        options.module =
            new dist_1.ModuleFinder(tree).find({
                name: options.name,
                path: options.path,
            }) || undefined;
        if (!options.module) {
            return tree;
        }
        const content = tree.read(options.module).toString();
        const declarator = new dist_1.ModuleDeclarator();
        tree.overwrite(options.module, declarator.declare(content, options));
        return tree;
    };
}
