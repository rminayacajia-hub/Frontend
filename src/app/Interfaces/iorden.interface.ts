import { IClienteInterface } from "./icliente.interface";
import { IMenuInterface } from "./imenu.interface";

export interface IOrdenInterface {
  id?: number;
  fechaOrden: Date;
  cantidad: number;
  clienteid: number;
  menuid: number;
  //cliente?: IClienteInterface;
  //menu?: IMenuInterface;

}
