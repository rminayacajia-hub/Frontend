import { Component, OnInit } from '@angular/core';
import { IOrdenInterface } from '../../Interfaces/iorden.interface';
import { RestauranteService } from '../../services/restaurante.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare const Swal: any;


@Component({
  selector: 'app-orden',
  imports: [CommonModule],
  templateUrl: './orden.component.html',
  styleUrl: './orden.component.css'
})
export class nuevaorden {
ordenesform: FormGroup = new FormGroup({});
  titulo_formulario = 'Registro de nuevo cliente';
  id: number = 0;
  Editar: boolean = false;
ordenes: any;

   constructor(
    private servicioOrdenes: RestauranteService,
    private navegacion: Router,
    private parametros: ActivatedRoute
  ) {
    this.ordenesform = new FormGroup({
     
      Fecha: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
       cantidad: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),


 
    });
 
    this.parametros.params.subscribe((parametros) => {
      if (parametros['id']) {
        //actualizar
        this.titulo_formulario = 'Actualizar datos de cliente';
        this.id = parametros['id'];
        this.Editar = true;
 
      this.servicioOrdenes.getById(this.id)
      .then(ordenes => {
        console.log(ordenes)
        this.ordenesform.patchValue(ordenes);
      })
      .catch(error => {
        console.error('Error al obtener el cliente:', error);
      });
 
      } else {
        //nuevo cliente
        this.ordenesform.reset();
      }
    });
  }
 
  ngOnInit() {}
 
  enviar() {
    if (this.ordenesform.invalid) {
      console.log('Formulario invalido');
      return;
    }
    Swal.fire({
      title: 'Desea guardar la informacion del cliente?',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: `Cancelar`,
      icon: 'question',
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.Editar == true) {
          const cliente = this.ordenesform.value;
          cliente.id = this.id;
          console.log('formData edit: ',cliente);
         
          this.servicioOrdenes.update(cliente)
          .then(clienteActualizado => {
            console.log(clienteActualizado)
            if (clienteActualizado == null) {
              Swal.fire('cliente', 'Error al guardar', 'error');
              return;
            }
            Swal.fire('cliente', 'Se guardó con éxito', 'success');
            this.ordenesform.reset();
            this.navegacion.navigate(['']);
          })
          .catch(error => {
            Swal.fire('cliente', 'Error al guardar', 'error');
            console.error('Error al actualizar el cliente:', error);
          });
 
        } else {
          const cliente = this.ordenesform.value;
         
          console.log(cliente)
 
          this.servicioOrdenes.create(cliente)
          .then(uncliente => {
            Swal.fire('cliente', 'Se guardó con éxito', 'success');
            this.ordenesform.reset();
            this.navegacion.navigate(['']);
          })
          .catch(error => {
            Swal.fire('cliente', 'Error al guardar', 'error');
            console.error('Error al crear el cliente:', error);
          });
         
        }
      } else if (result.isDenied) {
        Swal.fire('cliente', 'El usuario cancelo la operacion', 'success');
      }
    });
  }
 


}
