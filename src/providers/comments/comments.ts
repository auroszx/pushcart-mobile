import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommentsProvider {

    private endpointUrl: string;

        constructor(public http: HttpClient) {
            this.endpointUrl = 'http://'+ window.location.hostname + ':3000';
        }
    
    getCommentContent(comment_id){
        const httpOptions = {
	      headers: new HttpHeaders({
	        //'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

        return this.http.get(this.endpointUrl+'/comments/by/'+comment_id, httpOptions);
    }

    updateComment(comment_id, comment_content) {

	    const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    let data = {
	        comment_id: comment_id,
	        comment_content: comment_content
	    };

        return this.http.put(this.endpointUrl+'/comments/update', JSON.stringify(data), httpOptions);
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

    createComment(comment_content) {

	    const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };

	    let data = {
	        comment_content: comment_content
	    };

	    return this.http.post(this.endpointUrl+'/comments/create', JSON.stringify(data), httpOptions);
	}

	getAllComments(search) {

		const httpOptions = {
	      headers: new HttpHeaders({
	        // 'Authorization': this.token,
	        'Authorization': localStorage.getItem("token"),
	        'Content-Type':'application/json'
	      })
	    };
	    if (search.trim() == "") {
	    	return this.http.get(this.endpointUrl+'/comments/search=send_all', httpOptions);
	    }
	    else {
	    	return this.http.get(this.endpointUrl+'/comments/search='+search, httpOptions);
	    }
	    

	}

}