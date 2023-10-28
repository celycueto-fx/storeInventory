import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showFiller = true;
  key="";
  showDashboard=true;
  createProduct=false;
  inventory=false;
  invoice=false;
  constructor(private route:ActivatedRoute,private router:Router){
    let firstParam = this.route.snapshot.queryParamMap.get('edit');

    this.key=firstParam?firstParam:"";
    console.log(this.key)
  }

  ngOnInit(): void {

  }


redirect(index:number){
switch (index) {
  case 0:

     this.showDashboard=true;
     this.invoice=false;
     this.createProduct=false;
     this.inventory=false;
    //this.router.navigate(['/invoice']);
    break;
    case 1:
      this.showDashboard=false;
      this.invoice=true;
      this.createProduct=false;
      this.inventory=false;
     // this.router.navigate(['/product']);
    break;
    case 2:
      this.showDashboard=false;
     this.invoice=false;
     this.createProduct=true;
     this.inventory=false;
   //   this.router.navigate(['/manager-product']);
    break;
    case 3:
      this.showDashboard=false;
     this.invoice=false;
     this.createProduct=false;
     this.inventory=true;
   //   this.router.navigate(['/manager-product']);
    break;

  default:
    this.showDashboard=true;
    break;
}

}

}
