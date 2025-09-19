import { Routes } from '@angular/router';


import { MenuComponent } from './views/menu.component/menu.component';
import { ClienteComponent } from './views/cliente.component/cliente.component';
import { OrdenComponent } from './views/orden.component/orden.component';


export const routes: Routes = [
//{ path: '', redirectTo: '/menus', pathMatch: 'full' },
{ path: 'menus', component: MenuComponent },
{ path: 'clientes', component: ClienteComponent },
{ path: 'ordenes', component: OrdenComponent },


];


