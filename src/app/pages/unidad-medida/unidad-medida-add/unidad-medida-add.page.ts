import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { MyValidators } from 'src/app/config/MyValidators.service';
import { UnidadMedidaService } from 'src/app/core/unidad-medida/unidad-medida.service';

@Component({
  selector: 'app-unidad-medida-add',
  templateUrl: './unidad-medida-add.page.html',
  styleUrls: ['./unidad-medida-add.page.scss'],
})
export class UnidadMedidaAdd implements OnInit {
  productImage="assets/img/upload.png";
  unidadForm: FormGroup;
  errorMessage: string;
  validation_messages:any;

  constructor(
    private navCtr: NavController,
    private formBuilder: FormBuilder,
    private my_validators:MyValidators,
    private unidadService: UnidadMedidaService,
    private modalController : ModalController
  ) { }

  ngOnInit() {
    this.initForm();
    this.validaciones();
  }

  initForm(){
    this.unidadForm = this.formBuilder.group({
     
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
  
    this.unidadService.getByFilter("nombre",value.nombre.toLowerCase()).subscribe(respuesta=>{
    
      if(Object.keys(respuesta).length>0){
        this.my_validators.presentAlertError("Ya existe otra unidad de medida con el mismo nombre");
      }else{
        this.my_validators.showLoader("Registrando....");
        let body = {
          nombre: value.nombre.toLowerCase()
        };
        this.unidadService.register(body,localStorage.getItem("idToken")).subscribe(resp=>{
          let p2 = this.my_validators.hideLoader();
          let p3 = this.my_validators.presentAlertSuccess("unidad-medida");
          Promise.all([p2,p3]);
          this.initForm();
        });
      }
    });
    
  }

  public async goToListUnidad(){
    // this.navCtr.navigateBack('/unidad-medida');
    await this.modalController.dismiss();
  }

   

}
