import { NgModule } from '@angular/core';

import {
  MatGridListModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule {}
