export class User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: Date;
    cartTotalPrice : number;
    cart:[ {
        productId : string;
        productName : string;
        cartQuantity : number;
        isAvailable : boolean;
        productPrice : number
    }];
}