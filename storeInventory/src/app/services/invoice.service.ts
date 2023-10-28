
import { Injectable } from '@angular/core';

import { getDatabase, ref, child, push, update, get, remove } from "firebase/database";
import { ProductInterface } from '../models/product-interface';
import { InvoiceInterface } from '../models/invoice-interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor() { }

  CreateInvoice(invoice:InvoiceInterface) {


    const db = getDatabase();
    return push(ref(db, `Invoice/`), {

      nameCliente:invoice.nameCliente,
      idCliente:invoice.idCliente,
      nameP:invoice.product,
      cantP:invoice.cantP,
      detail:invoice.detail,
      iva:invoice.iva,
     descuento:invoice.descuento,
     total:invoice.total


    });


  }



  // Get a key for a new Post.
  // Write the new post's data simultaneously in the posts list and the user's post list.


}



