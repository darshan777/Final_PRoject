export class User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: Date;
    cart: [{
        productId : string;
        productName : string;
        cartQuantity : string;
        isAvailable : boolean;
    }];
}