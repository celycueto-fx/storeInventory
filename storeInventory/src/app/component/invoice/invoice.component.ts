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
      cantidad: new FormControl('',[Validators.required,Validators.min(1),Validators.pattern("[0-9]*")]),
      iva: new FormControl(''),
      descuento: new FormControl(''),
      total: new FormControl(''),
    });

    this.getDatos();
  }

  async createVenta():Promise<void>{
    this.formInvoice.controls['products'].setValue(this.dataSource);
    this.formInvoice.controls['total'].setValue(this.total);

    this.invoiceService$.CreateInvoice(this.formInvoice.value).then((res)=>{
      alert("factura generada con exito!!")
     this.clearInputsInvoice();
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

 async setproduct(producto:ProductInterface,id:String) {


let data={
  codigo:producto.codigo,
      tipo:producto.tipo,
      name:producto.name,
      cant:Number(producto.cant)-this.formInvoice.get('cantidad')?.value,
      precioUnitario:producto.precioUnitario,
      detail:producto.detail

}

  await this.productService$.setProduct(data,id);

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

  this.setproduct(productItem!,productItem?.$key!)
    this.dataSource.push(data);
    if( this.dataSource){
      this.tabla?.renderRows();

    }
    let canti=this.dataSource.reduce((acumulador, actual) => acumulador + Number(actual.cant!), 0);
    this.subtotal= this.dataSource.reduce((acumulador, actual) => acumulador + Number(actual.precioUnitario!), 0);

   this.descuento=this.dataSource.reduce((acumulador, actual) => acumulador + Number(actual.descuento!), 0);
   this.iva=this.dataSource.reduce((acumulador, actual) => acumulador + Number(actual.iva!), 0);
   this.total= (this.subtotal*canti)-(this.subtotal*this.descuento)-(this.subtotal*this.iva);

   this.clearInputsP();
   }
 deleteProduct(id:number){
if(id){
  this.dataSource.splice(id,1);
  this.tabla.renderRows();
}


 }

 clearInputsP(){

  this.formInvoice.controls['products'].setValue('');
    this.formInvoice.controls['cantidad'].setValue('');
    this.formInvoice.controls['iva'].setValue('');
    this.formInvoice.controls['descuento'].setValue('');
    this.formInvoice.controls['detail'].setValue('');
 }

 clearInputsInvoice(){
  this.formInvoice.controls['date'].setValue('');
  this.formInvoice.controls['nameCliente'].setValue('');
 this.formInvoice.controls['idCliente'].setValue('');
    this.formInvoice.controls['detail'].setValue('');
    this.dataSource=[]

 }
}
