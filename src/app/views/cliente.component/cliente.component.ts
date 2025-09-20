import { Component, OnInit } from '@angular/core';
import { IClienteInterface } from '../../Interfaces/icliente.interface';
import { RestauranteService } from '../../services/restaurante.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente.component',
  imports: [CommonModule,RouterLink],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
//clientes: any;

clientes: IClienteInterface[] = [];


  
    constructor(private restauranteServicio: RestauranteService) {}
  
      ngOnInit(): void {
      this.restauranteServicio.todos_cliente().subscribe((lista)=>{
        console.table(lista),
        this.clientes=lista;
      })
      }

}
