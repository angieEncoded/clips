import { Directive, Host, HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]'
})
export class EventBlockerDirective {

    // We can add multiple decorators to listen to multiple events
    @HostListener('drop', ['$event'])
    @HostListener('dragover', ['$event'])
    public handleEvent(event: Event){
      event.preventDefault()
      event.stopPropagation() // stop bubbling
    }



}
