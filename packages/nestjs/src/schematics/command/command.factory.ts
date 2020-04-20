import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import {
  DeclarationOptions,
  mergeSourceRoot,
  ModuleDeclarator,
  ModuleFinder,
} from '@nestjs/schematics/dist';

import { CommandOptions } from './command.schema';

export function main(options: CommandOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        mergeWith(generate(options)),
      ])
    )(tree, context);
  };
}

function transform(source: CommandOptions): CommandOptions {
  const target: CommandOptions = Object.assign({}, source);
  target.metadata = 'providers';
  target.type = 'handler';

  if (!target.name) {
    throw new SchematicsException('Option (name) is required.');
  }
  target.name = strings.dasherize(source.name);
  target.path = strings.dasherize(source.path);

  target.path = join(target.path as Path, target.name);
  return target;
}

function generate(options: CommandOptions) {
  return (context: SchematicContext) =>
    apply(url('./files'), [
      options.spec ? noop() : filter((path) => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options,
      }),
      move(options.path),
    ])(context);
}

function addDeclarationToModule(options: CommandOptions): Rule {
  return (tree: Tree) => {
    options.module =
      new ModuleFinder(tree).find({
        name: options.name,
        path: options.path as Path,
      }) || undefined;
    if (!options.module) {
      return tree;
    }
    const content = tree.read(options.module)!.toString();
    const declarator: ModuleDeclarator = new ModuleDeclarator();
    tree.overwrite(
      options.module,
      declarator.declare(content, options as DeclarationOptions)
    );
    return tree;
  };
}
