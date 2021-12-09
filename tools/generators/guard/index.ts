import {formatFiles, Tree} from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "@nrwl/tao/src/commands/ngcli-adapter";

export default async function (tree: Tree, schema: any) {
  const schematic = wrapAngularDevkitSchematic('@schematics/angular', 'guard');
  await schematic(tree, {
    "implements": ["CanActivate", "CanActivateChild", "CanLoad", "CanDeactivate"],
    "name": schema.name,
    "module": schema.module,
    "project": schema.project
  })
  await formatFiles(tree);
  return () => {
  };
}
