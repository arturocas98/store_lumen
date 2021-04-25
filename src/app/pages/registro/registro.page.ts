import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;
  usuario: Usuario;
  cargando: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtr: NavController,
    public loadingController: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        "", Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "", Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ),
      nombre: new FormControl(
        "", Validators.compose([
          Validators.required,
          // Validators.pattern("/^[a-zA-Z]+$/"),
          Validators.maxLength(35)
        ])
      ),
      apellido: new FormControl(
        "", Validators.compose([
          Validators.required,
          // Validators.pattern("/^[a-zA-Z]+$/"),
          Validators.maxLength(35)
        ])
      ),

    });
    this.usuario = new Usuario();
    this.cargando = false;
  }

  ngOnInit() {

  }

  // Show the loader for infinite time
  showLoader() {

    this.loadingController.create({
      message: 'Registrando...'
    }).then((res) => {
      res.present();
    });

  }

  // Hide the loader if already created otherwise return error
  hideLoader() {

    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }

  validation_messages = {
    email: [
      { type: "required", message: "El email es requerido" },
      { type: "pattern", message: "Este no es un email valido" }
    ],
    password: [
      { type: "required", message: " El password es requerido" },
      { type: "minlength", message: "Minimo 5 caracteres para el password" }
    ],
    nombre: [
      { type: "required", message: "El nombre es requerido" },
      // { type: "pattern", message: "Debe ingresar solo letras" },
      { type: "maxlength", message: "Sólo se permiten de 35 letras para el nombre" }

    ],
    apellido: [
      { type: "required", message: " El apellido es requerido" },
      // { type: "pattern", message: "Debe ingresar solo letras" },
      { type: "maxlength", message: "Sólo se permiten de 35 letras para el apellido" }
    ]
  }

  async presentAlertError(mensaje) {
    const alert = await this.alertCtrl.create({
      header: 'ERROR ⚠ ',
      subHeader: mensaje,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async presentAlertSuccess() {
    const alert = await this.alertCtrl.create({
      header: 'Exitoso ✔ ',
      subHeader: "Se ha registrado correctamente la información",
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.navCtr.navigateBack("/login");

        }
      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  goToLogin() {
    this.navCtr.navigateBack('/login');
  }

  register(value) {
    console.log("value:", value);
    // this.showLoader();

    this.usuario.nombre = value.nombre;
    this.usuario.apellido = value.apellido;
    this.usuario.email = value.email;
    this.usuario.password = value.password;
    this.usuario.return_secure_token = true;

    this.authService.getByFilter("?email="+this.usuario.email).subscribe((res:any)=>{
      if (res.result.length > 0) {
        alert("se encontraron coincidencias");
      }else{
        alert("no se encontraron coincidencias");
      }

    },err=>{
      // alert("no se encontraron coincidencias");

    });

    return;

    this.authService.registerAuth(this.usuario).subscribe(res => {
      this.cargando = false;
      let p1s = this.hideLoader();
      let p2s = this.presentAlertSuccess();
      Promise.all([p1s, p2s]);
    }, err => {
      var error = err.error.error.message == 'EMAIL_EXISTS' ? 'Correo ya registrado' : '';
      let p1 = this.hideLoader();
      let p2 = this.presentAlertError(error);
      Promise.all([p1, p2]);
    });
  }

}
