import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SponsorDetailsPage } from './sponsor-details';

@NgModule({
  declarations: [
    SponsorDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SponsorDetailsPage),
  ],
})
export class SponsorDetailsPageModule {}
