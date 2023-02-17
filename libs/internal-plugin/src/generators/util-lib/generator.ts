import {
  formatFiles, Tree
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/js';
import { UtilLibGeneratorSchema } from './schema';

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
