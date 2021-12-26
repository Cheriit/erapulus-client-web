import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NavigationService} from '@erapulus/utils/navigation';
import {UniversityEditLogoService} from './university-edit-logo.service';

@Component({
  selector: 'ep-university-edit-logo',
  template: `
    <ep-form-section
      title="management-panel.university.add-logo.title"
      description="management-panel.university.add-logo.description">
      <ep-file-manager
        (fileSent)="onSend()"
        [hasList]="false"
        class="flex justify-center flex-col pl-4"
        [uploadMultiple]="false"
        accept="image/*"
        [fileManagerService]="universityEditLogoService"
        [patch]="true"
      ></ep-file-manager>
    </ep-form-section>
  `,
  styleUrls: ['./university-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityEditLogoComponent implements OnInit {
  @Input() universityId!: string;

  constructor (
    private readonly navigationService: NavigationService,
    public readonly universityEditLogoService: UniversityEditLogoService
  ) {
  }

  ngOnInit (): void {
    this.universityEditLogoService.setUniversity(this.universityId);
  }

  public onSend (): void {
    this.navigationService.back();
  }
}
