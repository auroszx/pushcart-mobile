import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommentsProvider {

    private endpointUrl: string;

    constructor(public http: HttpClient) {
        this.endpointUrl = 'http://'+ window.location.hostname + ':3000';
    }
    
    getComment(comment_id){
        const httpOptions = {
	      headers: new HttpHeaders({
	        //'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

        return this.http.get(this.endpointUrl+'/comments/by/'+comment_id, httpOptions);
    }

	deleteComment(comment_id) {

		const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    return this.http.delete(this.endpointUrl+'/comments/delete/'+comment_id, httpOptions);
	}

    createComment(product_id, comment_content) {

	    const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    let data = {
					product_id: product_id,
	        comment_content: comment_content
	    };

	    return this.http.post(this.endpointUrl+'/comments/create', JSON.stringify(data), httpOptions);
	}

	getAllComments(product_id) {

		const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    return this.http.get(this.endpointUrl+'/comments/'+product_id, httpOptions);
	}

}