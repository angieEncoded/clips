import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class RegisterValidators {

    // test = 5
    
    // static is for methods that run from our class - if we didn't use the static keyword we'd have to create a
    // new instance of this class. These are utility methods that don't need to worry about state
    static match(controlName: string, matchingControlName: string) : ValidatorFn{

        return (group: AbstractControl)  : ValidationErrors | null => {
            // console.log(this.test) // static methods don't have access to the object's properties
            const control = group.get(controlName)
            const matchingControl = group.get(matchingControlName)



            if(!control || !matchingControl){
                console.error('Form controls cannot be found in the form group.')
                return {
                    controlNotFound: false
                }
            }

            const error = control.value === matchingControl.value ? null : {noMatch: true}

            matchingControl.setErrors(error) // add an error to the control
            return error
        }



    
    }
}
