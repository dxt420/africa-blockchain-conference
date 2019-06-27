import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsPage } from './notifications';

import {TimeAgoPipe} from 'time-ago-pipe';


@NgModule({
  declarations: [
    NotificationsPage,
    TimeAgoPipe
  ],
  imports: [
    IonicPageModule.forChild(NotificationsPage),
    
  ],
})
export class NotificationsPageModule {}
