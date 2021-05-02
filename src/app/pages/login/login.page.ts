import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MyValidators } from 'src/app/config/MyValidators.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  usuario : Usuario;
  validation_messages = {
    email: [
      { type: "required", message: "El email es requerido" },
      { type: "pattern", message: "Este no es un email valido" }
    ],
    password: [
      { type: "required", message: " El password es requerido" },
      { type: "minlength", message: "Minimo 5 caracteres para el password" }
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private authService: AuthService,
    private navController: NavController,
    private my_validators:MyValidators,
    private menu:MenuController
  ) {
    this.formBuilder = new FormBuilder();
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.initForm();
    this.menu.enable(false);
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])),
      password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)]))
    })
  }

  loginUser(value) {
    console.log("value:", value);
    this.usuario.email = value.email;
    this.usuario.password = value.password;
    this.usuario.return_secure_token = true;
    this.my_validators.showLoader("Iniciando sesión ... ");
    this.authService.getByFilter("email",this.usuario.email).subscribe((res:any)=>{
      if (Object.keys(res).length > 0) {
        this.authService.loginAuth(this.usuario).subscribe((resp:any)=>{
          console.log("respuesta:",resp);
          
          this.usuario.idToken = resp.idToken;
          // this.usuario.id = res.result[0].id;
          // console.log("data:",data);
          let id = Object.keys(res).toString();
          console.log("id:",id);
          let body = {
            idToken: resp.idToken
          }
          this.authService.updateUser(id,body).subscribe(resp3=>{
            
            localStorage.setItem("idToken",this.usuario.idToken);
            localStorage.setItem("email", resp['email']);

            let today = new Date();
            today.setSeconds(resp['expiresIn']);
            localStorage.setItem("expiresIn", today.getTime().toString());
            this.my_validators.hideLoader();
            this.navController.navigateForward('/home');
            this.menu.enable(true);
          });
        },err=>{
          this.my_validators.presentAlertError("Correo o contraseña incorrecto");
          this.my_validators.hideLoader();
        });
      }else{
        this.my_validators.presentAlertError("No tiene una cuenta registrada");
        this.my_validators.hideLoader();
      }

    },err=>{
      this.my_validators.presentAlertError("No se ha podido conectar con el servidor");
      this.my_validators.hideLoader();
    });
    
  }

  goToRegister(){
    this.navController.navigateForward('/registro');
  }


}
