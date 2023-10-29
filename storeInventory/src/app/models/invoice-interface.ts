import { ProductInterface } from "./product-interface";

export interface InvoiceInterface {
  nameCliente:String;
  idCliente:String;
  date:String;
  products:ProductInterface[];
  detail:String;
  cantidad:number;
  iva:Number;
  descuento:Number;
  total:Number;

}
