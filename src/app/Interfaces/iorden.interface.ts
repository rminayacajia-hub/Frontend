import { IClienteInterface } from "./icliente.interface";
import { IMenuInterface } from "./imenu.interface";

export interface IOrdenInterface {
  Id?: number;
  fechaOrden: Date;
  cantidad: number;
  total: number;
  clienteId: number;
  menuId: number;
  cliente?: IClienteInterface;
  menu?: IMenuInterface;

}
