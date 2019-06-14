import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilerPage } from './profiler';

@NgModule({
  declarations: [
    ProfilerPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilerPage),
  ],
})
export class ProfilerPageModule {}
