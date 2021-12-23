import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit, Provider} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectAccessor, SelectItem} from './select.accessor';
import {TextType} from '../text/text.component';
import {SubscriptionManagerService} from '@erapulus/utils/subscription-manager';

const SELECT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  // eslint-disable-next-line no-use-before-define
  useExisting: forwardRef(() => SelectInputComponent),
  multi: true
};

@Component({
  selector: 'ep-select-input',
  template: `
    <div (click)="toggleVisibility()">
      <div><input type="text" [placeholder]="placeholder" name="value" [formControl]="control"/>
      </div>
      <div class="relative" *ngIf="visible && displayedItems.length > 0">
        <div class="window">
          <div *ngFor="let item of displayedItems; trackBy: trackByFn" (click)="selectItem(item)">
            <ep-text [textType]="textType.SMALL">{{item.name}}</ep-text>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./select-input.component.scss'],
  providers: [SELECT_CONTROL_VALUE_ACCESSOR]
})
export class SelectInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() staticItems?: SelectItem[];
  @Input() accessor?: SelectAccessor;
  @Input() label?: string;
  @Input() errorPrefix = 'common.forms.error.';
  @Input() placeholder!: string;
  public select?: string | null;
  public disabled = false;
  public items: SelectItem[] = this.staticItems ?? [];
  public displayedItems: SelectItem[] = this.items;
  public control = new FormControl('');
  public textType = TextType;
  public visible = false;
  // eslint-disable-next-line @typescript-eslint/ban-types
  private onTouched!: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  private onChanged!: Function;

  constructor (private subscriptionManager: SubscriptionManagerService) {
  }

  ngOnInit (): void {
    if (this.accessor) {
      this.accessor.get().subscribe((items) => {
        this.items = [
          ...(this.staticItems ?? []),
          ...items
        ];
        this.recalculateVisibleItems();
      });
    }

    this.subscriptionManager.subscribe(this.control.valueChanges.subscribe((value) => {
      this.valueChange(value);
      this.recalculateVisibleItems();
    }));
  }

  ngOnDestroy (): void {
    this.subscriptionManager.unsubscribeAll();
  }

  registerOnChange (fn: never): void {
    this.onChanged = fn;
  }

  registerOnTouched (fn: never): void {
    this.onTouched = fn;
  }

  selectItem (item: SelectItem): void {
    this.select = item.id;
    this.control.setValue(item.name);
    this.onChanged(item.id);
    this.toggleVisibility();
  }

  writeValue (value: string): void {
    this.select = value;
    const element = this.items.filter((element) => element.id === value);
    if (element.length > 0) {
      this.control.setValue(element[0].name);
    } else {
      this.control.setValue('');
    }
  }

  setDisabledState (isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  trackByFn (index: number, element: SelectItem): string {
    return element.id;
  }

  valueChange (event: string): void {
    if (this.onTouched) {
      this.onTouched();
    }
    const eventContent = event.toLowerCase() ?? '';
    this.select = undefined;
    if (this.onChanged) {
      this.onChanged(undefined);
    }
    const selected = this.items.filter((item) => item.name.toLowerCase() === eventContent);
    if (selected.length === 1) {
      this.select = selected[0].id;
      this.onChanged(selected[0].id);
    }
  }

  public toggleVisibility (): void {
    this.visible = !this.visible;
  }

  private recalculateVisibleItems (): void {
    this.displayedItems = this.items.filter((item) => item.name?.toLowerCase().includes(this.control.value));
  }
}
