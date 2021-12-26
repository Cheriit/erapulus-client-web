import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {CustomValidators, FormService} from '@erapulus/utils/forms';
import {Observable} from 'rxjs';
import {
  BuildingDataAccessService,
  BuildingEditRequestParams,
  ErapulusBuilding,
  ErapulusHelpers,
  ErapulusResponse
} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class BuildingEditFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private building?: ErapulusBuilding;

  constructor (private formBuilder: FormBuilder, private buildingDataAccessService: BuildingDataAccessService) {
    super();
  }

  public createForm (building: ErapulusBuilding): FormGroup {
    this.building = building;
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(building.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ]),
      abbrev: this.formBuilder.control(building.abbrev, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(64)
      ]),
      latitude: this.formBuilder.control(building.latitude, [
        Validators.required,
        CustomValidators.latitude()
      ]),
      longitude: this.formBuilder.control(building.longitude, [
        Validators.required,
        CustomValidators.longitude()
      ])
    });
    return this.form;
  }

  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form && this.building) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        const values = this.form.value;
        const requestData: BuildingEditRequestParams = {
          buildingId: this.building.id,
          universityId: this.building.university,
          name: values['name'],
          abbrev: values['abbrev'],
          latitude: values['latitude'],
          longitude: values['longitude']
        };
        return ErapulusHelpers.handleRequest(this.buildingDataAccessService.editBuilding(requestData), this.form);
      }
    }
    return null;
  }

}
