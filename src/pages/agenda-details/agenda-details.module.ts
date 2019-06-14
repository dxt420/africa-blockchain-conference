import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaDetailsPage } from './agenda-details';

@NgModule({
  declarations: [
    AgendaDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaDetailsPage),
  ],
})
export class AgendaDetailsPageModule {}
