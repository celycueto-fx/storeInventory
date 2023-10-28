import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductInterface } from 'src/app/models/product-interface';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProductsService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/utils/alert.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  formInvoice!: FormGroup;
  displayedColumns: string[] = [ 'codigo','nombre','cantidad','precio', 'iva','descuento', 'delete'];
  listProducts:ProductInterface[]=[];
  dataSource:ProductInterface[] = [];
  data:ProductInterface[] = [];
  total=0
  subtotal=0;
  descuento=0;
  iva=0;

  @ViewChild(MatTable) tabla!: MatTable<ProductInterface>;


  constructor(
     private productService$: ProductsService,
     private invoiceService$:InvoiceService,
    private router:Router,
    private alertService: AlertService){

    }
  ngOnInit(): void {
    this.formInvoice = new FormGroup({

      nameCliente: new FormControl('', [Validators.required]),
      idCliente: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      products:new FormControl('',Validators.required),
      detail: new FormControl('',),
      cantidad: new FormControl(''),
      iva: new FormControl(''),
      descuento: new FormControl(''),
      total: new FormControl(''),
    });

    this.getDatos();
  }

  async createVenta():Promise<void>{
    this.invoiceService$.CreateInvoice(this.formInvoice.value).then((res)=>{
      console.log(res)
    })
  }

  async getDatos(): Promise<void> {
    await this.productService$.getProducts().then((res) => {

      if (res) {
        Object.getOwnPropertyNames(res).forEach((val, idx, array) => {
          let data = Object.keys(res);
          res[val].$key = data[idx]
          this.data[idx] = res[val]
          this.listProducts=this.data;

        });
      }

    })

 }
 addProd(){;

let productItem= this.listProducts.find((element) => element.name == this.formInvoice.get('products')?.value);

  let data={
    codigo: productItem?.codigo,
    name:this.formInvoice.get('products')?.value,
    cant:this.formInvoice.get('cantidad')?.value,
    iva:this.formInvoice.get('iva')?.value,
    precioUnitario: productItem?.precioUnitario,
   descuento:this.formInvoice.get('descuento')?.value,

  }


    this.dataSource.push(data);
    if( this.dataSource){
      this.tabla?.renderRows();

    }
    let canti=this.dataSource.reduce((acumulador, actual) => acumulador + Number(actual.cant!), 0);
    this.subtotal= this.dataSource.reduce((acumulador, actual) => acumulador + Number(actual.precioUnitario!), 0);
    this.total= this.subtotal*canti;

   }
 deleteProduct(id:number){
if(id){
  this.dataSource.splice(id,1);
  this.tabla.renderRows();
}


 }
}
