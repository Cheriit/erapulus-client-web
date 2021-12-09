import {formatFiles, installPackagesTask, Tree} from '@nrwl/devkit';
import {libraryGenerator} from '@nrwl/workspace/generators';
import {wrapAngularDevkitSchematic} from "@nrwl/tao/src/commands/ngcli-adapter";

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
    testEnvironment: 'node'
  });

  const schematic = wrapAngularDevkitSchematic('@schematics/angular', 'module');
  await schematic(tree, {
    "routing": true,
    "name": schema.name,
    "project": schema.name,
    "flat": true
  });

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
