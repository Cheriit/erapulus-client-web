import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: any) {
  await libraryGenerator(tree, {
    name: schema.name,
    skipFormat: false,
    buildable: true,
    directory: `${schema.type}`,
    importPath: `@erapulus/${schema.name}`,
    linter: 'eslint',
    simpleModuleName: true,
    tags: `type:${schema.type}`,
    unitTestRunner: 'jest',
    strict: true,
    testEnvironment: 'node',
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
