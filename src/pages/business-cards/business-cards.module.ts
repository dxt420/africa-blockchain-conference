import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessCardsPage } from './business-cards';

@NgModule({
  declarations: [
    BusinessCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessCardsPage),
  ],
})
export class BusinessCardsPageModule {}
