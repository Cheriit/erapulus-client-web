import {formatFiles, Tree} from '@nrwl/devkit';
import {wrapAngularDevkitSchematic} from "@nrwl/tao/src/commands/ngcli-adapter";

export default async function (tree: Tree, schema: any) {
  const schematic = wrapAngularDevkitSchematic('@schematics/angular', 'component');
  await schematic(tree, {
    "style": "scss",
    "changeDetection": "OnPush",
    "displayBlock": true,
    "skipTests": true,
    "inlineTemplate": true,
    "name": schema.name,
    "module": schema.module,
    "project": schema.project
  })
  await formatFiles(tree);
  return () => {
  };
}
