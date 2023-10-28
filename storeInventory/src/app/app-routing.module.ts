import { ProductComponent } from './component/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { ManagerProductComponent } from './component/manager-product/manager-product.component';

const routes: Routes = [

  { path: '', component:LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product', component:ProductComponent },
  { path: 'invoice', component: InvoiceComponent},
  { path: 'manager-product', component: ManagerProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
