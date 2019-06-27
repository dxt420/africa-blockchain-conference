import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitorDetailsPage } from './exhibitor-details';

@NgModule({
  declarations: [
    ExhibitorDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExhibitorDetailsPage),
  ],
})
export class ExhibitorDetailsPageModule {}
