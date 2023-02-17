import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { UtilLibGeneratorSchema } from './schema';
import { libraryGenerator } from '@nrwl/js';

export default async function (tree: Tree, options: UtilLibGeneratorSchema) {
  options.name = 'util-' + options.name;
  if (options.tags) {
    options.tags += `,type:util,scope:${options.directory}`;
  } else {
    options.tags = `type:util,scope:${options.directory}`;
  }
  await libraryGenerator(tree, options);
  await formatFiles(tree);
}
