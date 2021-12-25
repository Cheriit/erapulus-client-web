import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BuildingRoutingModule} from './building-routing.module';
import {BuildingListComponent} from './building-list/building-list.component';
import {TableModule} from '@erapulus/ui/table';
import {UiComponentsModule} from '@erapulus/ui/components';
import {TranslateModule} from '@ngx-translate/core';
import {BuildingCreateComponent} from './building-create/building-create.component';
import {BuildingEditComponent} from './building-edit/building-edit.component';
import {BuildingShowComponent} from './building-show/building-show.component';
import {BuildingCreateFormComponent} from './building-create/building-create-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BuildingEditFormComponent} from './building-edit/building-edit-form.component';

@NgModule({
  declarations: [
    BuildingListComponent,
    BuildingCreateComponent,
    BuildingEditComponent,
    BuildingShowComponent,
    BuildingCreateFormComponent,
    BuildingEditFormComponent
  ],
  imports: [
    CommonModule,
    BuildingRoutingModule,
    TableModule,
    UiComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class BuildingModule {
}
