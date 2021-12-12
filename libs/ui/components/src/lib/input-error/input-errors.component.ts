import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ep-input-errors',
  template: `
    <ng-container *ngIf="control.invalid && control.dirty && control.enabled">
      <p class="error">{{control.errors | json}}</p>
    </ng-container>
  `,
  styleUrls: ['./input-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputErrorsComponent implements OnInit {
  @Input() control!: FormControl;

  constructor (private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit (): void {
    this.control.statusChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }
}
