import { Injectable } from '@angular/core';

import { getDatabase, ref, child, push, update, get, remove } from "firebase/database";
import { ProductInterface } from '../models/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  setCliente(producto:ProductInterface, id: String) {


    const db = getDatabase();
    update(ref(db, `Productos/${id}`), {
      codigo:producto.codigo,
      tipo:producto.tipo,
      name:producto.name,
      cant:producto.cant,
      precioUnitario:producto.precioUnitario,
      detail:producto.detail

    });
  }

  CreateProduct(producto:ProductInterface) {


    const db = getDatabase();
    return push(ref(db, `Productos/`), {

      codigo:producto.codigo,
      tipo:producto.tipo,
      name:producto.name,
      cant:producto.cant,
      precioUnitario:producto.precioUnitario,
      detail:producto.detail


    });


  }

  getProducts() {

    const dbRef = ref(getDatabase());
    return get(child(dbRef, `Productos/`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  getProductId(id: String) {

    const dbRef = ref(getDatabase());
    return get(child(dbRef, `Productos/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {

        return snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  deleteProduct(id: String) {
    const dbRef = ref(getDatabase());
    return remove(child(dbRef, `Productos/${id}`)).then((snapshot) => {

    }).catch((error) => {
      console.error(error);
    });
  }

  // Get a key for a new Post.
  // Write the new post's data simultaneously in the posts list and the user's post list.


}



