import { Component, Inject, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectRefinementList } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'ais-custom-refine',
  template: `
    <ul [ngStyle]="{'display':'flex','flex-wrap':'wrap','list-style':'none', 'justify-content':'space-between'}">
        <li *ngFor="let item of state.items" [ngStyle]="{'width':'40px', 'height':'40px', 'margin-bottom':'10px'}">
          <button [ngStyle]="{'width':'40px', 'height':'40px'}" (click)="state.refine($event.target.value)" [style.border]="item.isRefined ? '1px solid black' : 'none'" [style.background]="item.value"></button>
        </li>
    </ul>
  `,
  // <span>{{item.count}}</span>
  styles: [
    `li > button {
      width: 40px;
      height: 40px;
      border-radius:50%
    }
    `
  ]
})
export class CustomRefine extends BaseWidget {
  state: {
    items: { label: string; value: string, count: number }[];
    createURL: () => string;
    refine: (value: string) => void;
    canRefine: boolean;
    isShowingMore: boolean;
    toggleShowMore: () => void;
    canToggleShowMore: boolean;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('CustomRefine');
  }

  public ngOnInit() {
    this.createWidget(connectRefinementList, { attribute: 'color' });
    super.ngOnInit();
  }
}
