import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class CartProvider {

	private endpointUrl: string;

	constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
		this.endpointUrl = 'http://192.168.12.1:3000';
        console.log(this.endpointUrl);
	}

	async getCart(){
        const httpOptions = {
	      headers: new HttpHeaders({
	        'Authorization': await this.nativeStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

        return this.http.get(this.endpointUrl+'/cart', httpOptions);
    }

    async deleteFromCart(product_id) {

		const httpOptions = {
	      headers: new HttpHeaders({
	        'Authorization': await this.nativeStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    return this.http.delete(this.endpointUrl+'/cart/delete/'+product_id, httpOptions);
	}

    async addProductToCart(product_id, user_product_qty) {

	    const httpOptions = {
	      headers: new HttpHeaders({
	        'Authorization': await this.nativeStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    let data = {
			product_id: product_id,
	        user_product_qty: user_product_qty
	    };

	    return this.http.post(this.endpointUrl+'/cart/add', JSON.stringify(data), httpOptions);
	}

	async clearCart() {

		const httpOptions = {
	      headers: new HttpHeaders({
	        'Authorization': await this.nativeStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    return this.http.delete(this.endpointUrl+'/cart/clear', httpOptions);
	}


	async buyProductsFromCart() {
        const httpOptions = {
	      headers: new HttpHeaders({
	        'Authorization': await this.nativeStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

        return this.http.get(this.endpointUrl+'/cart/buy', httpOptions);
    }

    async setCartQuantity(user_wishlist_id, user_product_qty) {

    	const httpOptions = {
	      headers: new HttpHeaders({
	        'Authorization': await this.nativeStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    let data = {
			user_wishlist_id: user_wishlist_id,
	        user_product_qty: user_product_qty
	    };

	    return this.http.put(this.endpointUrl+'/cart/setqty', JSON.stringify(data), httpOptions);

    }


}
