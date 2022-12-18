import { Injectable } from '@angular/core';


interface IModal{
  id: string;
  visible: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ModalService {


  private modals: IModal[] = []

  constructor() { }


  register(id:string) {
    this.modals.push({
      id, 
      visible: false
    })
    // console.log(this.modals)
  }

  unregister(id:string){
    this.modals = this.modals.filter(
      element => element.id !== id
    )
  }

  isModalOpen(id:string) : boolean{
    // optional chaining - if we don't get an object it will stop at the question mark
    // return !!this.modals.find(element => element.id === id)?.visible
    // double negation will convert a non-boolean value into a boolean

    // More clear way is to wrap the entire function into a boolean function
    return Boolean(this.modals.find(element => element.id === id)?.visible)
    
  
  }

  toggleModal(id:string) {

    const modal = this.modals.find(element => element.id === id)

    if(modal) {
      modal.visible = !modal.visible
    }
    // this.visible = !this.visible;
  }


}
