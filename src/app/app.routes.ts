import { Routes } from '@angular/router';


import { MenuComponent } from './views/menu.component/menu.component';
import { ClienteComponent } from './views/cliente.component/cliente.component';
import { OrdenComponent } from './views/orden.component/orden.component';
import { nuevomenu } from './views/menu.component/nuevo-menu';
import { nuevocliente } from './views/cliente.component/nuevo-cliente';
import { nuevaorden } from './views/orden.component/nueva-orden';


export const routes: Routes = [
//{ path: '', redirectTo: '/menus', pathMatch: 'full' },
{ path: 'menus', component: MenuComponent },
{ path: 'clientes', component: ClienteComponent },
{ path: 'ordenes', component: OrdenComponent },
{ path: 'nuevo-menu', component: nuevomenu },
{ path: 'nuevo-cliente', component: nuevocliente },
{ path: 'nueva-orden', component: nuevaorden },




];


