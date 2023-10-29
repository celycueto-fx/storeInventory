import { Component, Inject,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/dialog-data';
import { ProductInterface } from 'src/app/models/product-interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
formProduct!:FormGroup;
product!:ProductInterface;
  constructor(
    private productService$: ProductsService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,){}
  ngOnInit(): void {

this.initForm();
this.getProduct();

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

 async getProduct():Promise<void>{

    this.productService$.getProductId(this.data).then((res)=>{

    this.formProduct.controls['name'].setValue(res.name);
    this.formProduct.controls['codigo'].setValue(res.codigo);
    this.formProduct.controls['tipo'].setValue(res.tipo);
    this.formProduct.controls['cant'].setValue(res.cant);
    this.formProduct.controls['detail'].setValue(res.detail);
    this.formProduct.controls['precioUnitario'].setValue(res.precioUnitario);
    });
  }

  editProduct(){
    this.productService$.setProduct(this.formProduct.value,this.data);
    this.dialogRef.close();
  }
}
