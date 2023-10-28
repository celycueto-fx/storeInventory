import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ProductInterface } from 'src/app/models/product-interface';
import { ProductsService } from 'src/app/services/products.service';

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
    private router: Router
  ){

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.getDatos()
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
   let key = this.data[id].$key
    this.router.navigate(['/product'], { queryParams: { edit: key?.toString() } }
    );
  }

  async deleteProduct(id: number): Promise<void> {
    let key = this.data[id].$key;
    if(key){
    await this.serviceProduct$.deleteProduct(key).then();

    this.dataSource.splice(id,1);
    this.tabla.renderRows();
    }
  }
}
