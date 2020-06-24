import { Component, Inject, forwardRef, AfterViewInit, OnInit } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectRefinementList } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'ais-custom-refine-price',
  template: `<mat-checkbox [ngStyle]="{'display':'block'}"
              *ngFor="let item of state.items" [value]="item.value"
              class="example-margin"
              (click)="state.refine(item.value)">
              {{item.value}}
            </mat-checkbox>
 `,
  // <span>{{item.count}}</span>
  styles: []
})
export class CustomRefinePrice extends BaseWidget implements AfterViewInit, OnInit {
  checked:boolean;
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
    super('CustomRefinePrice');
  }

  ngOnInit() {
    this.createWidget(connectRefinementList, { attribute: 'priceRange', operator:'or' });
    super.ngOnInit();
    // this.min = this.calculateMinMax('min', this.state.items);
    // this.max = this.calculateMinMax('max', this.state.items);
    console.log(this.state,  'stateteeee pricee')
  }

  logEvent(event) {
    console.log(event.checked)
  }
  ngAfterViewInit(){
  }
   
  calculateMinMax(type:string, state){
    console.log(state)
    if(type == 'min'){
      // return this.min =  Math.min.apply(Math, state.map((o) => { return o.value; }))
    }else{
      // return this.max =  Math.max.apply(Math, state.map((o) => { return o.value; }))
    }
  }
}
