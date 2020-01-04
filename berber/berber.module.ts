import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BerberRoutingModule } from './berber-routing.module';
import { SelectPageModule } from './select/select.module';
import { SearchPageModule } from "./search/search.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SelectPageModule,
    SearchPageModule,
    BerberRoutingModule,
  ]
})
export class BerberModule { }
