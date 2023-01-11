import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage/manage.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent } from './upload/upload.component';
import { VideoRoutingModule } from './video-routing.module';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent,
    EditComponent,

  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class VideoModule { }
