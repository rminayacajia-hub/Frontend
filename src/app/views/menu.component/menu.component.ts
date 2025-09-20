import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IMenuInterface } from '../../Interfaces/imenu.interface';
import { RestauranteService } from '../../services/restaurante.service';
import { RouterLink } from '@angular/router';
declare const Swal: any;


@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  menus: IMenuInterface[]= [];

  constructor(private restauranteServicio: RestauranteService) {}

    ngOnInit(): void {
    this.restauranteServicio.todos_menu().subscribe((lista)=>{
      console.table(lista),
      this.menus=lista;
    })
    }

}
