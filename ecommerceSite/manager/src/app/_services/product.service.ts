import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Product } from '../_models/index';

@Injectable()
export class ProductService {
    constructor(private http: Http) { }


    getAll() {
        
        return this.http.get('/products').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/products/' + _id).map((response: Response) => response.json());
    }

    create(product: Product) {
        return this.http.post('/products/create', product);
    }

    update(product: Product) {
    
        return this.http.put('/products/' + product._id, product);
    }

    delete(_id: string) {
        
        return this.http.delete('/products/' + _id);
    }
}