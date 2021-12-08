import { Tree, formatFiles } from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "@nrwl/tao/src/commands/ngcli-adapter";

export default async function (tree: Tree, schema: any) {
  const schematic_component =  wrapAngularDevkitSchematic('@schematics/angular', 'module');
  await schematic_component(tree, {
    "name": schema.name,
    "module": "ui-components",
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