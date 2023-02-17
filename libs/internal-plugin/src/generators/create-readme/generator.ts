import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  names,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { CreateReadmeGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: CreateReadmeGeneratorSchema
) {
  const config = readProjectConfiguration(tree,options.name);
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    config.root,
    { projectName: options.name, template: '' }
  );
  await formatFiles(tree);
}
