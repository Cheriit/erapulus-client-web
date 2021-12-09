import {formatFiles, Tree} from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "@nrwl/tao/src/commands/ngcli-adapter";

export default async function (tree: Tree, schema: any) {
  const schematic = wrapAngularDevkitSchematic('@nrwl/angular', 'ngrx');
  await schematic(tree, {
    "barrels": true,
    "facade": true,
    "useDataPersistence": true,
    "name": schema.name,
    "root": schema.root,
    "module": schema.module,
    "project": schema.project,
    "directory": "_state"
  })
  await formatFiles(tree);
  return () => {
  };
}
