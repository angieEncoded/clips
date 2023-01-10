import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';
import { EventBlockerDirective } from './directives/event-blocker.directive';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { TabComponent } from './tab/tab.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';

//import { ModalService } from '../services/modal.service';

@NgModule({
  declarations: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
    EventBlockerDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ], 
  exports: [
    ModalComponent,
    TabComponent,
    TabsContainerComponent,
    InputComponent,
    AlertComponent,
    EventBlockerDirective
  ],
  providers: [
    //ModalService
  ]
})
export class SharedModule { }
