import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class CommentsProvider {

    private endpointUrl: string;

    constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
        this.endpointUrl = 'http://192.168.43.139:3000';
        console.log(this.endpointUrl);
    }
    
    async getComment(comment_id){
        const httpOptions = {
	      headers: new HttpHeaders({
	        //'Authorization': this.token,
	        'Authorization': await this.nativeStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

        return this.http.get(this.endpointUrl+'/comments/'+comment_id, httpOptions);
    }

	async deleteComment(comment_id) {

		const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': await this.nativeStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    return this.http.delete(this.endpointUrl+'/comments/delete/'+comment_id, httpOptions);
	}

    async createComment(product_id, product_comment) {

	    const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': await this.nativeStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    let data = {
			product_id: product_id,
	        product_comment: product_comment
	    };

	    return this.http.post(this.endpointUrl+'/comments/create', JSON.stringify(data), httpOptions);
	}

	async getAllComments(product_id) {

		const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': await this.nativeStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    return this.http.get(this.endpointUrl+'/comments/product/'+product_id, httpOptions);
	}

}