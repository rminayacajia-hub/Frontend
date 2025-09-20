import { Component, OnInit } from '@angular/core';
import { IClienteInterface } from '../../Interfaces/icliente.interface';
import { RestauranteService } from '../../services/restaurante.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare const Swal: any;


@Component({
  selector: 'app-cliente',
  imports: [CommonModule],
  templateUrl: './cliente.component.html',
  //styleUrl: './cliente.component.css'
})
export class nuevocliente {

  clienteform: FormGroup = new FormGroup({});
  titulo_formulario = 'Registro de nuevo cliente';
  id: number = 0;
  Editar: boolean = false;
  clientes: any;

   constructor(
    private servicioCliente: RestauranteService,
    private navegacion: Router,
    private parametros: ActivatedRoute
  ) {
    this.clienteform = new FormGroup({
     
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
       apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),  
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),

 
    });
 
    this.parametros.params.subscribe((parametros) => {
      if (parametros['id']) {
        //actualizar
        this.titulo_formulario = 'Actualizar datos de cliente';
        this.id = parametros['id'];
        this.Editar = true;
 
      this.servicioCliente.getById(this.id)
      .then(cliente => {
        console.log(cliente)
        this.clienteform.patchValue(cliente);
      })
      .catch(error => {
        console.error('Error al obtener el cliente:', error);
      });
 
      } else {
        //nuevo cliente
        this.clienteform.reset();
      }
    });
  }
 
  ngOnInit() {}
 
  enviar() {
    if (this.clienteform.invalid) {
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
          const cliente = this.clienteform.value;
          cliente.id = this.id;
          console.log('formData edit: ',cliente);
         
          this.servicioCliente.update(cliente)
          .then(clienteActualizado => {
            console.log(clienteActualizado)
            if (clienteActualizado == null) {
              Swal.fire('cliente', 'Error al guardar', 'error');
              return;
            }
            Swal.fire('cliente', 'Se guardó con éxito', 'success');
            this.clienteform.reset();
            this.navegacion.navigate(['']);
          })
          .catch(error => {
            Swal.fire('cliente', 'Error al guardar', 'error');
            console.error('Error al actualizar el cliente:', error);
          });
 
        } else {
          const cliente = this.clienteform.value;
         
          console.log(cliente)
 
          this.servicioCliente.create(cliente)
          .then(uncliente => {
            Swal.fire('cliente', 'Se guardó con éxito', 'success');
            this.clienteform.reset();
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
