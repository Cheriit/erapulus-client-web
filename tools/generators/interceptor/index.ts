import { Tree, formatFiles } from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "@nrwl/tao/src/commands/ngcli-adapter";

export default async function (tree: Tree, schema: any) {
  const schematic =  wrapAngularDevkitSchematic('@schematics/angular', 'interceptor');
  await schematic(tree, {
    "name": schema.name,
    "module": schema.module,
    "project": schema.project
  })
  await formatFiles(tree);
  return () => {
  };
}
