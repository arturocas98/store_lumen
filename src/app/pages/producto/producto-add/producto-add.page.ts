import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { MyValidators } from 'src/app/config/MyValidators.service';
import { Plugins,CameraResultType,CameraSource } from "@capacitor/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.page.html',
  styleUrls: ['./producto-add.page.scss'],
})
export class ProductoAddPage implements OnInit {
  productImage="assets/img/upload.png";
  productoForm: FormGroup;
  errorMessage: string;
  validation_messages:any;
  photo:SafeResourceUrl;

  constructor(
    private navCtr: NavController,
    private formBuilder: FormBuilder,
    private my_validators:MyValidators,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit() {
    this.initForm();
    this.validaciones();
  }

  initForm(){
    this.productoForm = this.formBuilder.group({
      imagen: new FormControl(
        "",[]
      ),
      nombre: new FormControl(
        "", Validators.compose([
          Validators.required,
          Validators.maxLength(50)
          // Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      precio: new FormControl(
        "", Validators.compose([
          Validators.required,
          Validators.maxLength(8)
        ])
      ),
      categoria: new FormControl(
        "", Validators.compose([
          Validators.required,
          // Validators.pattern("/^[a-zA-Z]+$/"),
        ])
      ),
      unidad_medida: new FormControl(
        "",[]
      ),

    });
  }

  validaciones(){
    this.validation_messages = {
      nombre: [
        { type: "required", message: "El nombre es requerido" },
        { type: "maxlength", message: "Sólo se permiten de 50 letras para el nombre" }
      ],
      precio: [
        { type: "required", message: " El precio es requerido" },
        { type: "minlength", message: "Máximo 8 caracteres para el precio" }
      ],
      categoria: [
        { type: "required", message: "La categoria es requerida" },
  
      ],
     
    }
  }

  register(value) {
    console.log("value:", value);
  }

  goToRegister(){
    this.navCtr.navigateBack('/producto');
  }

   async takePhoto(){
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing:false, // desps de tomar la foto editarla 
      resultType: CameraResultType.DataUrl, //formato de cifrado
      source: CameraSource.Camera // seleccionar foto desde camara o galeria 
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
    console.log(this.photo);

  }

  uploadImage($event){
    console.log($event.target.files[0]);
  }

}
