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

this.initForm();
  }
  ngOnInit(): void {

  }

  initForm(){
    this.formProduct = new FormGroup({

      codigo: new FormControl('', [Validators.required]),
      tipo: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      cant: new FormControl('', [Validators.required,Validators.min(1),Validators.pattern("[0-9]*")]),
      precioUnitario: new FormControl('', [Validators.required,Validators.min(1),Validators.pattern("[0-9]*")]),
      detail: new FormControl(''),
    });
  }
  createProduct(){
    this.productService$.CreateProduct(this.formProduct.value).then(()=>{
      alert("Producto creado exitosamente");
      this.clearInputs();
    }).catch(error => {

     })
  }

clearInputs(){

  this.formProduct.controls['name'].setValue('');
  this.formProduct.controls['codigo'].setValue('');
  this.formProduct.controls['tipo'].setValue('');
  this.formProduct.controls['cant'].setValue('');
  this.formProduct.controls['detail'].setValue('');
  this.formProduct.controls['precioUnitario'].setValue('');
}
}
