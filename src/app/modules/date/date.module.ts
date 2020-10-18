import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { DATE_REDUCER_NODE, dateReduser } from "./date.reducer";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(DATE_REDUCER_NODE, dateReduser)
  ]
})
export class DateModule { }
