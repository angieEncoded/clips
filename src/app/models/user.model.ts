
export default interface IUser {
    email:string,
    password: string,
    age: number,
    name: string,
    phoneNumber: string
}

// We can create a class based model or an interface based model. They both work. 
// export default class IUser {
//     email?:string;
//     password?: string;
//     age?: number;
//     name?: string;
//     phoneNumber?: string
// }



// export default interface IUser {
//     email:string,
//     password: string,
//     age: number,
//     name: string,
//     phoneNumber: string
// }


// Classes are an official feature of javascript
// Interfaces are a feature of typescript
// Interfaces don't get transpiled, they get dropped
// methods can be added to classes
// Interfaces are useful for modeling basic objects
// Interfaces keep our bundle lean