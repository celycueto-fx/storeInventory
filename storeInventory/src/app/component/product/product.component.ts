import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/utils/alert.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  implements OnInit{
  formProduct!: FormGroup;

  constructor(
    private productService$: ProductsService,
    private router:Router,
    private alertService: AlertService) {


  }
  ngOnInit(): void {
    this.formProduct = new FormGroup({

      codigo: new FormControl('', [Validators.required]),
      tipo: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      cant: new FormControl('', Validators.required),
      precioUnitario: new FormControl('', Validators.required),
      detail: new FormControl(''),
    });
  }
  createProduct(){
    this.productService$.CreateProduct(this.formProduct.value).then(()=>{

    }).catch(error => {

     })
  }


}
