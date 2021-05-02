import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
    private unidadService: UnidadMedidaService

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
    console.log("value:", value);
    this.unidadService.register(value).subscribe(resp=>{

    });
  }

  goToListUnidad(){
    this.navCtr.navigateBack('/unidad-medida');
  }

   

}
