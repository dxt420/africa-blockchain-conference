import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeakerDetailsPage } from './speaker-details';

@NgModule({
  declarations: [
    SpeakerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeakerDetailsPage),
  ],
})
export class SpeakerDetailsPageModule {}
