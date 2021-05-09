import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { MyValidators } from 'src/app/config/MyValidators.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Usuario } from 'src/app/models/Usuario';
import * as moment from 'moment';

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
  // my_validators:MyValidators;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtr: NavController,
    private my_validators: MyValidators
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



  goToLogin() {
    this.navCtr.navigateBack('/login');
  }

  register(value) {
    console.log("value:", value);

    this.usuario.nombre = value.nombre;
    this.usuario.apellido = value.apellido;
    this.usuario.email = value.email;
    this.usuario.password = value.password;
    this.usuario.return_secure_token = true;

    this.authService.getByFilter("email",this.usuario.email).subscribe((res:any)=>{
      if (Object.keys(res).length > 0) {
        
        this.my_validators.presentAlertError("Correo ya registrado");
        // Promise.all([p1, p2]);
      }else{
        this.my_validators.showLoader("Registrando ....");
        this.authService.registerAuth(this.usuario).subscribe((res:any) => {
          console.log("respuesta:",res);
          this.usuario.idToken = res['idToken'];
          this.authService.registerDatabase(this.usuario).subscribe(res2=>{
            let p1s = this.my_validators.hideLoader();
            let p2s = this.my_validators.presentAlertSuccess("/login");
            Promise.all([p1s, p2s]);
          });
          


        });
      }

    });

    return;

   
  }



}

// register(value) {
//   console.log("value:", value);

//   this.usuario.nombre = value.nombre;
//   this.usuario.apellido = value.apellido;
//   this.usuario.email = value.email;
//   this.usuario.password = value.password;
//   this.usuario.return_secure_token = true;
//   this.my_validators.showLoader("Registrando ....");
//   this.authService.getByFilter("email", this.usuario.email).subscribe((res: any) => {
//     console.log("respuesta:", res);
//     // this.my_validators.hideLoader();
//     if (Object.keys(res).length > 0) {
//       let p1s = this.my_validators.hideLoader();
//       let p2s = this.my_validators.presentAlertError("Correo ya registrado");
//       Promise.all([p1s, p2s]);
//       // this.my_validators.presentAlertError("Correo ya registrado");
//     } else {
//       this.authService.registerAuth(this.usuario).subscribe((resAuth: any) => {
//         console.log("respuesta:", resAuth);
//         this.usuario.idToken = res['idToken'];
//         this.authService.registerDatabase(this.usuario).subscribe(resRegister => {
//           this.my_validators.alertaExitosa("/login")
//         }, err => {
//           this.my_validators.alertaErronea("La solicitud no tuvo exito");
//         });
//       });
//     }

//   }, err => {
//     this.my_validators.alertaErronea("No se ha podido conectar con el servidor");
//   });

//   return;


// }
