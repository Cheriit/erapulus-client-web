import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModuleFilesService} from './module-files.service';

@Component({
  selector: 'ep-module-files',
  template: `
    <ep-container>
      <div class="section-content">
        <ep-file-manager
          [fileManagerService]="moduleFilesService"
        ></ep-file-manager>
      </div>
    </ep-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleFilesComponent implements OnInit {
  constructor (
    private readonly route: ActivatedRoute,
    public readonly moduleFilesService: ModuleFilesService) {
  }

  ngOnInit (): void {
    const universityId = this.route.snapshot.paramMap.get('university_id') ?? '-1';
    const facultyId = this.route.snapshot.paramMap.get('faculty_id') ?? '-1';
    const programId = this.route.snapshot.paramMap.get('program_id') ?? '-1';
    const moduleId = this.route.snapshot.paramMap.get('module_id') ?? '-1';
    this.moduleFilesService.setParameters(universityId, facultyId, programId, moduleId);
  }

}
