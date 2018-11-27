import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { CommentsProvider } from '../../../providers/comments/comments';

@Component({
  selector: 'productdescription',
  templateUrl: 'productdescription.html'
})
export class ProductDescription {

  editing: Boolean = false;
  response: any;
  product_title: String;
  product_description: String;
  product_image: string;
  product_stock: number;
  comment_content: String;
  @ViewChild('fileinput') fileinput: ElementRef;
  comments = [];
  message: String;
  url: String = 'http://'+ window.location.hostname + ':3000';

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private products: ProductsProvider, private navParams: NavParams, public http : HttpClient) {
    this.products.getProductDetail(this.navParams.get('product_id')).subscribe(res => {
      this.response = res;
      this.product_title = this.response[0].product_title;
      this.product_description = this.response[0].product_desc;
      this.product_image = this.response[0].product_image;
      this.product_stock = this.response[0].product_stock;
      this.comment_content = this.response[0].comment_content;
    });
  }

  sendComment(){
        if(this.message != ''){
          this.http.post(this.url, {message : this.message}).subscribe((res : any) => {
            this.message = '';
          })
        }
      }

  doToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  deleteProduct() {
    this.products.deleteProduct(this.navParams.get('product_id')).subscribe(res => {
      this.navCtrl.pop();
    });
  }

  editProduct() {
    this.products.updateProduct(this.navParams.get('product_id'), this.product_title, this.product_description, this.product_image, this.product_stock).subscribe(res => {
      this.toggleEdit();
    });
  }

  fakeClick() {
    this.fileinput.nativeElement.click();
  }

  setBase64Image(image) {
    this.readImage(image.target);
  }

  readImage(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader = new FileReader();
    myReader.onloadend = (e) => {
      this.product_image = myReader.result;
      //console.log(this.product_image);
    }
    myReader.readAsDataURL(file);
  }


}