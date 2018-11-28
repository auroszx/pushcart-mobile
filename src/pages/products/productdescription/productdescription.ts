import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'productdescription',
  templateUrl: 'productdescription.html'
})
export class ProductDescription {

  editing: Boolean = false;
  response: any;
  product_title: String;
  product_description: String;
  product_image: any = "";
  product_stock: number;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private products: ProductsProvider,
               private navParams: NavParams, private imagePicker: ImagePicker) {
    this.setProductInfo();
  }

  doToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  async setProductInfo() {
    (await this.products.getProductDetail(this.navParams.get('product_id'))).subscribe(res => {
      this.response = res;
      this.product_title = this.response[0].product_title;
      this.product_description = this.response[0].product_desc;
      this.product_image = this.response[0].product_image;
      this.product_stock = this.response[0].product_stock;
    });
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  async deleteProduct() {
    (await this.products.deleteProduct(this.navParams.get('product_id'))).subscribe(res => {
      this.navCtrl.pop();
    });
  }

  async editProduct() {
    (await this.products.updateProduct(this.navParams.get('product_id'), this.product_title, this.product_description, this.product_image, this.product_stock)).subscribe(res => {
      this.toggleEdit();
    });
  }

  pickImage() {
    this.imagePicker.hasReadPermission().then((hasPermission) => {
      if (hasPermission) {
        this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 1 }).then((results) => {
          for (var i = 0; i < results.length; i++) {
              this.product_image = 'data:image/jpeg;base64,' + results[i];
          }
        }, (err) => { console.log(err) });
      }
      else {
        this.imagePicker.requestReadPermission().then((result) => {
          if (result) {
            console.log(result);
            this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 1 }).then((results) => {
              for (var i = 0; i < results.length; i++) {
                  this.product_image = 'data:image/jpeg;base64,' + results[i];
              }
            }, (err) => { console.log(err) });
          }
        });
      }
        
    })
      
  }


}