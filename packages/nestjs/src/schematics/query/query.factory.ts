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
  ModuleDeclarator,
  ModuleFinder,
} from '@nestjs/schematics/dist';

import { QueryOptions } from './query.schema';

export function main(options: QueryOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([addDeclarationToModule(options), mergeWith(generate(options))])
    )(tree, context);
  };
}

function transform(source: QueryOptions): QueryOptions {
  const target: QueryOptions = Object.assign({}, source);
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

function generate(options: QueryOptions) {
  return (context: SchematicContext) => {
    return apply(url('./files'), [
      options.spec ? noop() : filter((path) => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options,
      }),
      move(options.path),
    ])(context);
  };
}

function addDeclarationToModule(options: QueryOptions): Rule {
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
