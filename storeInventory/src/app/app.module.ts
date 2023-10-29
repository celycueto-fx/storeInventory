import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, NgIf } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideFirebaseApp } from '@angular/fire/app';


import { initializeApp} from '@angular/fire/app';

import { provideFirestore,getFirestore, FirestoreModule } from '@angular/fire/firestore';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environments/environment';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductComponent } from './component/product/product.component';
import { ManagerProductComponent } from './component/manager-product/manager-product.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { EditProductComponent } from './component/manager-product/edit-product/edit-product.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    ManagerProductComponent,
    InvoiceComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
     MatCardModule,
     MatFormFieldModule,MatCardModule,
     FormsModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatDialogModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatTooltipModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatSidenavModule, NgIf, MatButtonModule,
    MatSlideToggleModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule.enablePersistence(),

  ],
  providers:[AngularFirestore, { provide: FIREBASE_OPTIONS, useValue: environment.firebase },],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
