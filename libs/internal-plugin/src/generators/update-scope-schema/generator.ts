import {
  formatFiles,
  getProjects,
  ProjectConfiguration,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import { UpdateScopeSchemaGeneratorSchema } from './schema';

function getScopes(tree): string[] {
  const projects = getProjects(tree);
  return Array.from(
    new Set(
      Array.from(projects, ([_, val]) => val).flatMap((project) =>
        project.tags.filter((tag) => tag.startsWith('scope:')).map(tag => tag.replace('scope:', ''))
      )
    )
  );
}

export default async function (
  tree: Tree,
  options: UpdateScopeSchemaGeneratorSchema
) {
  const scopes = getScopes(tree);
  // 'store' | 'api' | 'shared'
  const joinScopes = scopes.map(scope => `'${scope}'`).join(' | ');
  const interfaceDefinitionFilePath = 'libs/internal-plugin/src/generators/util-lib/schema.d.ts';
  const newContent = `export interface UtilLibGeneratorSchema {
    name: string;
    directory: ${joinScopes};
  }`;
  tree.write(interfaceDefinitionFilePath, newContent);

  await formatFiles(tree);
}
