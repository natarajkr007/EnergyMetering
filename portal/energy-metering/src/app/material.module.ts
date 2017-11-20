import { NgModule } from '@angular/core';

import {
  MatGridListModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatCardModule,
  MatSidenavModule
} from '@angular/material';

@NgModule({
  imports: [
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatSidenavModule
  ],
  exports: [
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatSidenavModule
  ]
})
export class MaterialModule {}
