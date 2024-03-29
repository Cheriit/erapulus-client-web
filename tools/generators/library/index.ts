import {formatFiles, installPackagesTask, Tree} from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "@nrwl/tao/src/commands/ngcli-adapter";

export default async function (tree: Tree, schema: any) {
  const schematic = wrapAngularDevkitSchematic('@nrwl/angular', 'library');

  await schematic(tree, {
    name: schema.name,
    skipFormat: false,
    directory: `${schema.type}`,
    importPath: `@erapulus/${schema.type}/${schema.name}`,
    linter: 'eslint',
    simpleModuleName: true,
    tags: `type:${schema.type}`,
    unitTestRunner: 'jest',
    strict: true,
    routing: true,
    prefix: 'ep'
  });

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
