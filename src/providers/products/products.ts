import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {

	token: string = undefined;
	endpointUrl: string;

  	constructor(public http: HttpClient) {
    	this.endpointUrl = 'http://'+ window.location.hostname + ':3000';
    	console.log(this.endpointUrl);
  	}

	getProductDetail(product_id) {

	    const httpOptions = {
	      headers: new HttpHeaders({
	        //'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    return this.http.get(this.endpointUrl+'/products/'+product_id, httpOptions);
	}

	updateProduct(product_id, product_title, product_description, product_image, product_stock) {

	    const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    let data = {
	        product_id: product_id,
	        product_title: product_title,
	        product_description: product_description,
					product_image: product_image,
					product_stock: product_stock
	    };

	    return this.http.put(this.endpointUrl+'/products/update', JSON.stringify(data), httpOptions);
	}

	deleteProduct(product_id) {

		const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    return this.http.delete(this.endpointUrl+'/products/delete/'+product_id, httpOptions);
	}

	createProduct(product_title, product_description) {

	    const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    let data = {
	        product_title: product_title,
	        product_description: product_description
	    };

	    return this.http.post(this.endpointUrl+'/products/create', JSON.stringify(data), httpOptions);
	}

	getAllProducts() {

		const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    return this.http.get(this.endpointUrl+'/products/user', httpOptions);

	}

}