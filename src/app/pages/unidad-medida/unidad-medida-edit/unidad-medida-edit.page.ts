import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { MyValidators } from 'src/app/config/MyValidators.service';
import { UnidadMedidaService } from 'src/app/core/unidad-medida/unidad-medida.service';
import { UnidadMedida } from 'src/app/models/unidad-medida';

@Component({
  selector: 'app-unidad-medida-edit',
  templateUrl: './unidad-medida-edit.page.html',
  styleUrls: ['./unidad-medida-edit.page.scss'],
})
export class UnidadMedidaEdit implements OnInit {
  productImage = "assets/img/upload.png";
  unidadForm: FormGroup;
  errorMessage: string;
  validation_messages: any;
  idUnidad: any;
  unidadMedida: any;
  constructor(
    private navCtr: NavController,
    private formBuilder: FormBuilder,
    private my_validators: MyValidators,
    private unidadService: UnidadMedidaService,
    private rutaActiva: ActivatedRoute,
    private navParams: NavParams,
    private modalController:ModalController
  ) { }

  ngOnInit() {
    this.initForm();
    this.validaciones();
    this.getUnidad();
  }
  getUnidad() {
    return new Promise((resolve, reject) => {
      this.idUnidad = this.navParams.data.id;
      this.unidadService.getById(this.idUnidad).subscribe(resp => {
        this.unidadMedida = resp;
        this.setValueForm();
      });
    });
  }

  setValueForm() {
    this.unidadForm.setValue({
      nombre: this.unidadMedida.nombre
    });
  }

  initForm() {
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

  validaciones() {
    this.validation_messages = {
      nombre: [
        { type: "required", message: "El nombre es requerido" },
        { type: "maxlength", message: "Sólo se permiten de 50 letras para el nombre" }
      ],


    }
  }

  register(value) {
    this.my_validators.showLoader("Actualizando....");
    this.unidadService.update(this.idUnidad, value, localStorage.getItem("idToken")).subscribe(resp => {
      let p1s = this.my_validators.hideLoader();
      let p2s = this.my_validators.presentAlertSuccess("unidad-medida");
      Promise.all([p1s, p2s]);
    });
  }

  // goToListUnidad() {
  //   this.navCtr.navigateBack('/unidad-medida');
    
  // }

  async goToListUnidad(){
    await this.modalController.dismiss();
  }



}
