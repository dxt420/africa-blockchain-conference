import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyContactInfoPage } from './my-contact-info';

@NgModule({
  declarations: [
    MyContactInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MyContactInfoPage),
  ],
})
export class MyContactInfoPageModule {}
