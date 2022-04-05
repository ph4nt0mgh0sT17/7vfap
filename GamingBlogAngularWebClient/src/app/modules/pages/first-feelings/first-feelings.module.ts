import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstFeelingsRoutingModule } from './first-feelings-routing.module';
import { FirstFeelingsComponent } from './first-feelings.component';


@NgModule({
  declarations: [
    FirstFeelingsComponent
  ],
  imports: [
    CommonModule,
    FirstFeelingsRoutingModule
  ]
})
export class FirstFeelingsModule { }
