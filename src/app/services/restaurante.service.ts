import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { MenuComponent } from '../views/menu.component/menu.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClienteComponent } from '../views/cliente.component/cliente.component';
import { OrdenComponent } from '../views/orden.component/orden.component';
import { IMenuInterface } from '../Interfaces/imenu.interface';
import { IClienteInterface } from '../Interfaces/icliente.interface';
import { IOrdenInterface } from '../Interfaces/iorden.interface';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  private rutaAPI = 'https://localhost:7162/api/Menu';
  private rutaAPIcliente = 'https://localhost:7162/api/Cliente';
  private rutaAPIordenes = 'https://localhost:7162/api/Orden';

    constructor(private http: HttpClient) { }

    todos_menu(): Observable<IMenuInterface[]> {
    return this.http.get<IMenuInterface[]>(this.rutaAPI);
    }
    todos_cliente(): Observable<IClienteInterface[]>{
      return this.http.get<IClienteInterface[]>(this.rutaAPIcliente)
    }
    todos_ordenes(): Observable<IOrdenInterface[]>{
      return this.http.get<IOrdenInterface[]>(this.rutaAPIordenes)
    }

/// menu

 getAll(): Promise<IMenuInterface[]> {
    return firstValueFrom(this.http.get<IMenuInterface[]>(this.rutaAPI));
  }


getById(id: number): Promise<IMenuInterface> {
    return firstValueFrom(this.http.get<IMenuInterface>(`${this.rutaAPI}/${id}`))
      .catch(error => {
        this.manejoErrores(error);
        throw error;
      });
  }

create(menu: IMenuInterface): Promise<IMenuInterface> {
  return firstValueFrom(this.http.post<IMenuInterface>(this.rutaAPI, menu))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}
 
update(menu: IMenuInterface): Promise<IMenuInterface> {
  return firstValueFrom(this.http.put<IMenuInterface>(`${this.rutaAPI}/${menu.id}`, menu))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}
 
delete(id: number): Promise<number> {
  return firstValueFrom(this.http.delete<number>(`${this.rutaAPI}/${id}`))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}
 
manejoErrores(error: any): void {
    const msg = error?.error?.message || error?.statusText || 'Error de red';
    console.error('Error:', msg);
  }
   


/// cliente

 getAllC(): Promise<IClienteInterface[]> {
    return firstValueFrom(this.http.get<IClienteInterface[]>(this.rutaAPIcliente));
  }


getByIdC(id: number): Promise<IClienteInterface> {
    return firstValueFrom(this.http.get<IClienteInterface>(`${this.rutaAPIcliente}/${id}`))
      .catch(error => {
        this.manejoErrores(error);
        throw error;
      });
  }

createC(clientes: IClienteInterface): Promise<IClienteInterface> {
  return firstValueFrom(this.http.post<IClienteInterface>(this.rutaAPIcliente, clientes))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}
 
updateC(clientes: IOrdenInterface): Promise<IClienteInterface> {
  return firstValueFrom(this.http.put<IClienteInterface>(`${this.rutaAPIcliente}/${clientes.id}`, clientes))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}
 
deleteC(id: number): Promise<number> {
  return firstValueFrom(this.http.delete<number>(`${this.rutaAPIcliente}/${id}`))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}


/// Ordenes

 getAllO(): Promise<IOrdenInterface[]> {
    return firstValueFrom(this.http.get<IOrdenInterface[]>(this.rutaAPIordenes));
  }


getByIdO(id: number): Promise<IOrdenInterface> {
    return firstValueFrom(this.http.get<IOrdenInterface>(`${this.rutaAPIordenes}/${id}`))
      .catch(error => {
        this.manejoErrores(error);
        throw error;
      });
  }

createO(ordenes: IOrdenInterface): Promise<IOrdenInterface> {
  return firstValueFrom(this.http.post<IOrdenInterface>(this.rutaAPIordenes, ordenes))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}
 
updateO(ordes: IOrdenInterface): Promise<IOrdenInterface> {
  return firstValueFrom(this.http.put<IOrdenInterface>(`${this.rutaAPIordenes}/${ordes.id}`, ordes))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}
 
deleteO(id: number): Promise<number> {
  return firstValueFrom(this.http.delete<number>(`${this.rutaAPIordenes}/${id}`))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}


}


