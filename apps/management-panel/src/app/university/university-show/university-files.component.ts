import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UniversityFilesService} from './university-files.service';

@Component({
  selector: 'ep-university-files',
  template: `
    <ep-container>
      <div class="section-content">
        <ep-file-manager
          [fileManagerService]="universityFilesService"
        ></ep-file-manager>
      </div>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityFilesComponent implements OnInit {
  public universityId!: string;

  constructor (
    private readonly route: ActivatedRoute,
    public readonly universityFilesService: UniversityFilesService) {
  }

  ngOnInit (): void {
    this.universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    this.universityFilesService.setUniversity(this.universityId);
  }

}
