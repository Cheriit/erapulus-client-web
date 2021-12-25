import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {CustomValidators, FormService} from '@erapulus/utils/forms';
import {catchError, Observable, of, take, tap} from 'rxjs';
import {BuildingCreateRequestParams, BuildingDataAccessService, ErapulusResponse} from '@erapulus/data-access/erapulus';

@Injectable({
  providedIn: 'root'
})
export class BuildingCreateFormService extends FormService<ErapulusResponse<unknown>> {
  protected override form?: FormGroup;
  private universityId?: string;

  constructor (private formBuilder: FormBuilder, private buildingDataAccessService: BuildingDataAccessService) {
    super();
  }

  createForm (universityId: string): FormGroup {
    this.universityId = universityId;
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ]),
      abbrev: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(64)
      ]),
      latitude: this.formBuilder.control('', [
        Validators.required,
        CustomValidators.latitude()
      ]),
      longitude: this.formBuilder.control('', [
        Validators.required,
        CustomValidators.longitude()
      ])
    });
    return this.form;
  }


  submitForm (): Observable<ErapulusResponse<unknown>> | null {
    if (this.form && this.universityId) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.form?.markAsPending();
        const values = this.form.value;
        const requestData: BuildingCreateRequestParams = {
          name: values['name'],
          abbrev: values['abbrev'],
          latitude: values['latitude'],
          longitude: values['longitude'],
          universityId: this.universityId
        };
        return this.buildingDataAccessService.createBuilding(requestData).pipe(
          take(1),
          tap(() => {
            this.form?.enable();
            this.form?.markAsTouched();
          }),
          catchError((error) => {
            this.form?.enable();
            this.form?.markAsTouched();
            return of(error as ErapulusResponse<unknown>);
          })
        );
      }
    }
    return of();
  }
}
