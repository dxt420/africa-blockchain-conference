import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DelegatesPage } from './delegates';

@NgModule({
  declarations: [
    DelegatesPage,
  ],
  imports: [
    IonicPageModule.forChild(DelegatesPage),
  ],
})
export class DelegatesPageModule {}
