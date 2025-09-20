import { Component, OnInit } from '@angular/core';
import { IOrdenInterface } from '../../Interfaces/iorden.interface';
import { RestauranteService } from '../../services/restaurante.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orden.component',
  imports: [CommonModule],
  templateUrl: './orden.component.html',
  styleUrl: './orden.component.css'
})
export class OrdenComponent implements OnInit{
    ordenes: IOrdenInterface[] = [];
  
    constructor(private restauranteServicio: RestauranteService) {}
  
      ngOnInit(): void {
      this.restauranteServicio.todos_ordenes().subscribe((lista)=>{
        console.table(lista),
        this.ordenes=lista;
      })
      }

}
