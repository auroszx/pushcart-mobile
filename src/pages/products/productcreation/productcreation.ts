import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'productcreation',
  templateUrl: 'productcreation.html'
})
export class ProductCreation {

  response: any;
  product_title: string = "";
  product_description: string = "";
  product_image: any = "";
  product_stock: number = 0;

  @ViewChild('fileinput') fileinput: ElementRef;
  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private products: ProductsProvider,
              private imagePicker: ImagePicker) {

  }

  doToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  createProduct() {
    this.products.createProduct(this.product_title, this.product_description, this.product_image, this.product_stock).subscribe(res => {
      this.response = res;
      if (this.response.status >= 400) {
        this.doToast(this.response.message);
      }
      if (this.response.status == 200) {
        this.navCtrl.pop();
      }
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

  pickImage() {
    this.imagePicker.hasReadPermission().then((hasPermission) => {
      if (hasPermission) {
        this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 1 }).then((results) => {
          for (var i = 0; i < results.length; i++) {
              this.product_image = results;
          }
        }, (err) => { });
      }
      else {
        this.imagePicker.requestReadPermission().then((result) => {
          if (result) {
            console.log(result);
            this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 1 }).then((results) => {
              for (var i = 0; i < results.length; i++) {
                  this.product_image = results;
              }
            }, (err) => { });
          }
        });
      }
        
    })
      
  }


}