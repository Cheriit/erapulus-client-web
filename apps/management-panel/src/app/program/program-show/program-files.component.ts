import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProgramFilesService} from './program-files.service';

@Component({
  selector: 'ep-program-files',
  template: `
    <ep-container>
      <div class="section-content">
        <ep-file-manager
          [fileManagerService]="programFilesService"
        ></ep-file-manager>
      </div>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramFilesComponent implements OnInit {
  constructor (
    private readonly route: ActivatedRoute,
    public readonly programFilesService: ProgramFilesService) {
  }

  ngOnInit (): void {
    const universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const facultyId = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    const id = this.route.snapshot.paramMap.get('program_id') ?? '-1';
    this.programFilesService.setParameters(universityId, facultyId, id);
  }

}
