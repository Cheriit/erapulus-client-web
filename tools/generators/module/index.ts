import { Tree, formatFiles } from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "@nrwl/tao/src/commands/ngcli-adapter";

export default async function (tree: Tree, schema: any) {
  const schematic =  wrapAngularDevkitSchematic('@schematics/angular', 'module');
  await schematic(tree, {
    "routing": schema.routing,
    "route": schema.routing? schema.route : undefined,
    "name": schema.name,
    "project": schema.project
  })
  await formatFiles(tree);
  return () => {
  };
}
