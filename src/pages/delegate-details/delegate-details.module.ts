import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DelegateDetailsPage } from './delegate-details';

@NgModule({
  declarations: [
    DelegateDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DelegateDetailsPage),
  ],
})
export class DelegateDetailsPageModule {}
