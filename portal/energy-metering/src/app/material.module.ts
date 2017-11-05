import { NgModule } from '@angular/core';

import {
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule {}
