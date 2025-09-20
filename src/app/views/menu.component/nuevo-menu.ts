import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IMenuInterface } from '../../Interfaces/imenu.interface';
import { RestauranteService } from '../../services/restaurante.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare const Swal: any;


@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './nuevo-menu.html',
  //styleUrl: './menu.component.css'
})
export class nuevomenu  {

  menuform: FormGroup = new FormGroup({});
  titulo_formulario = 'Registro de nuevo menu';
  id: number = 0;
  Editar: boolean = false;

   constructor(
    private servicioMenu: RestauranteService,
    private navegacion: Router,
    private parametros: ActivatedRoute
  ) {
    this.menuform = new FormGroup({
     
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
       descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      precio: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
            disponibilidad: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    
 
    });
 
    this.parametros.params.subscribe((parametros) => {
      if (parametros['id']) {
        //actualizar
        this.titulo_formulario = 'Actualizar datos de menu';
        this.id = parametros['id'];
        this.Editar = true;
 
      this.servicioMenu.getById(this.id)
      .then(menu => {
        console.log(menu)
        this.menuform.patchValue(menu);
      })
      .catch(error => {
        console.error('Error al obtener el menu:', error);
      });
 
      } else {
        //nuevo menu
        this.menuform.reset();
      }
    });
  }
 
  ngOnInit() {}
 
  enviar() {
    if (this.menuform.invalid) {
      console.log('Formulario invalido');
      return;
    }
    Swal.fire({
      title: 'Desea guardar la informacion del menu?',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: `Cancelar`,
      icon: 'question',
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.Editar == true) {
          const menu = this.menuform.value;
          menu.id = this.id;
          console.log('formData edit: ',menu);
         
          this.servicioMenu.update(menu)
          .then(menuActualizado => {
            console.log(menuActualizado)
            if (menuActualizado == null) {
              Swal.fire('menu', 'Error al guardar', 'error');
              return;
            }
            Swal.fire('menu', 'Se guardó con éxito', 'success');
            this.menuform.reset();
            this.navegacion.navigate(['']);
          })
          .catch(error => {
            Swal.fire('menu', 'Error al guardar', 'error');
            console.error('Error al actualizar el menu:', error);
          });
 
        } else {
          const menu = this.menuform.value;
         
          console.log(menu)
 
          this.servicioMenu.create(menu)
          .then(unmenu => {
            Swal.fire('menu', 'Se guardó con éxito', 'success');
            this.menuform.reset();
            this.navegacion.navigate(['']);
          })
          .catch(error => {
            Swal.fire('menu', 'Error al guardar', 'error');
            console.error('Error al crear el menu:', error);
          });
         
        }
      } else if (result.isDenied) {
        Swal.fire('menu', 'El usuario cancelo la operacion', 'success');
      }
    });
  }
 

}
