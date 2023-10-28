import { ProductInterface } from "./product-interface";

export interface InvoiceInterface {
  nameCliente:String;
  idCliente:String;
  date:String;
 product:Number;
  detail:String;
  cantP:Number;
  iva:Number;
  descuento:Number;
  total:Number;

}
