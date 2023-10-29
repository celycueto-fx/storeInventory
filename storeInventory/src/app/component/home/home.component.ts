import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showFiller = true;
  showDashboard=true;
  createProduct=false;
  inventory=false;
  invoice=false;

  totalInventario=200;
  isInventarioBajo=false;
  constructor(private ProductsService:ProductsService){

  }

  ngOnInit(): void {
      this.countInventary();

  }

async countInventary(): Promise<void>{
  this.ProductsService.getProducts().then((res)=>{
    let count=Object.keys(res);
    this.totalInventario=count.length;
    if(this.totalInventario<4){
      this.isInventarioBajo=true;
    }
  })
}





redirect(index:number){
switch (index) {
  case 0:

     this.showDashboard=true;
     this.invoice=false;
     this.createProduct=false;
     this.inventory=false;

    break;
    case 1:
      this.showDashboard=false;
      this.invoice=true;
      this.createProduct=false;
      this.inventory=false;

    break;
    case 2:
      this.showDashboard=false;
     this.invoice=false;
     this.createProduct=true;
     this.inventory=false;

    break;
    case 3:
      this.showDashboard=false;
     this.invoice=false;
     this.createProduct=false;
     this.inventory=true;

    break;

  default:
    this.showDashboard=true;
    break;
}

}

}
