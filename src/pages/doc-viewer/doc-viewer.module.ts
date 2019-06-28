import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocViewerPage } from './doc-viewer';

@NgModule({
  declarations: [
    DocViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(DocViewerPage),
  ],
})
export class DocViewerPageModule {}
