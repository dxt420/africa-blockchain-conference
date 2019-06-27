import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitorsPage } from './exhibitors';

@NgModule({
  declarations: [
    ExhibitorsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExhibitorsPage),
  ],
})
export class ExhibitorsPageModule {}
