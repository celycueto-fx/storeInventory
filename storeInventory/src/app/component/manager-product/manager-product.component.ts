import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {  Router } from '@angular/router';
import { ProductInterface } from 'src/app/models/product-interface';
import { ProductsService } from 'src/app/services/products.service';
import {MatDialog} from '@angular/material/dialog';
import { EditProductComponent } from './edit-product/edit-product.component';

@Component({
  selector: 'app-manager-product',
  templateUrl: './manager-product.component.html',
  styleUrls: ['./manager-product.component.css']
})
export class ManagerProductComponent implements OnInit,AfterViewInit {
  @ViewChild(MatTable) tabla!: MatTable<ProductInterface>;
  displayedColumns: string[] = [ 'codigo',  'nombre', 'tipo','cantidad','precio', 'edit', 'delete'];
  dataSource: ProductInterface[] = []
  data:ProductInterface[] = [];
  noData: String = ""


  constructor(
    private serviceProduct$:ProductsService,
    private router: Router,
    public dialog: MatDialog
  ){

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.getDatos();
  }

  async getDatos(): Promise<void> {
    await this.serviceProduct$.getProducts().then((res) => {


      if (res) {

        Object.getOwnPropertyNames(res).forEach((val, idx, array) => {

          let data = Object.keys(res);
          res[val].$key = data[idx]

          this.data[idx] = res[val]

          this.dataSource = this.data
          this.tabla.renderRows();
        });
      } else {
        this.noData = "No hay registros";
      }

    })




  }



  editarProduct(id: number): void {

   let key = this.data[id].$key as String;
   const dialogRef = this.dialog.open(EditProductComponent, {
    data: key,disableClose: true
  }, );

  dialogRef.afterClosed().subscribe(result => {
   alert("Producto modificado con exito!!");
   this.getDatos();
   this.tabla.renderRows();
  });

  }

  async deleteProduct(id: number): Promise<void> {
    let key = this.data[id].$key;
    if(key){
    await this.serviceProduct$.deleteProduct(key).then(()=>{
      alert("Item eliminado exitosamente !!");
    });

    this.dataSource.splice(id,1);
    this.tabla.renderRows();

    }
  }
}
