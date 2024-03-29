import {formatFiles, Tree} from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "@nrwl/tao/src/commands/ngcli-adapter";

export default async function (tree: Tree, schema: any) {
  const schematic = wrapAngularDevkitSchematic('@nrwl/angular', 'ngrx');
  await schematic(tree, {
    "barrels": true,
    "facade": true,
    "minimal": true,
    "useDataPersistence": true,
    "name": schema.name,
    "root": schema.root,
    "module": schema.module,
    "directory": "+state"
  })
  await formatFiles(tree);
  return () => {
  };
}
