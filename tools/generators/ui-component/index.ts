import { Tree, formatFiles } from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "@nrwl/tao/src/commands/ngcli-adapter";

export default async function (tree: Tree, schema: any) {
  const schematic_component =  wrapAngularDevkitSchematic('@schematics/angular', 'module');
  await schematic_component(tree, {
    "routing": schema.route,
    "route": schema.route? schema.routeName : undefined,
    "name": schema.name,
    "module": "UiComponents",
    "project": "ui-components"
  })

  const schematic =  wrapAngularDevkitSchematic('@schematics/angular', 'component');
  await schematic(tree, {
    "style": "scss",
    "changeDetection": "OnPush",
    "displayBlock": true,
    "skipTests": true,
    "inlineTemplate": true,
    "name": schema.name,
    "module": schema.name,
    "project": "ui-components",
    "export": true
  })
  await formatFiles(tree);
  return () => {
  };
}
