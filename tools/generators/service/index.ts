import {formatFiles, Tree} from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "@nrwl/tao/src/commands/ngcli-adapter";

export default async function (tree: Tree, schema: any) {
  const schematic = wrapAngularDevkitSchematic('@schematics/angular', 'service');
  await schematic(tree, {
    "name": schema.name,
    "project": schema.project
  })
  await formatFiles(tree);
  return () => {
  };
}
