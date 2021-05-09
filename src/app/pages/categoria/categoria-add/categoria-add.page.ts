import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { MyValidators } from 'src/app/config/MyValidators.service';
import { CategoriaService } from 'src/app/core/categoria/categoria.service';

@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.page.html',
  styleUrls: ['./categoria-add.page.scss'],
})
export class CategoriaAdd implements OnInit {
  productImage="assets/img/upload.png";
  categoriaForm: FormGroup;
  validation_messages:any;

  constructor(
    private navCtr: NavController,
    private formBuilder: FormBuilder,
    private my_validators:MyValidators,
    private categoriaService: CategoriaService,
    private modalController : ModalController
  ) { }

  ngOnInit() {
    this.initForm();
    this.validaciones();
  }

  initForm(){
    this.categoriaForm = this.formBuilder.group({
     
      nombre: new FormControl(
        "", Validators.compose([
          Validators.required,
          Validators.maxLength(50)
          // Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      

    });
  }

  validaciones(){
    this.validation_messages = {
      nombre: [
        { type: "required", message: "El nombre es requerido" },
        { type: "maxlength", message: "Sólo se permiten de 50 letras para el nombre" }
      ],
    
     
    }
  }

  register(value) {
  
    this.categoriaService.getByFilter("nombre",value.nombre.toLowerCase()).subscribe(respuesta=>{
    
      if(Object.keys(respuesta).length>0){
        this.my_validators.presentAlertError("Ya existe otra unidad de medida con el mismo nombre");
      }else{
        this.my_validators.showLoader("Registrando....");
        let body = {
          nombre: value.nombre.toLowerCase()
        };
        this.categoriaService.register(body,localStorage.getItem("idToken")).subscribe(resp=>{
          let p2 = this.my_validators.hideLoader();
          let p3 = this.my_validators.presentAlertSuccess("categoria");
          Promise.all([p2,p3]);
          this.initForm();
        });
      }
    });
    
  }

  public async goToListCategoria(){
    await this.modalController.dismiss();
  }

   

}
