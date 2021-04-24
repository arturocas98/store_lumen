import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

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
    // private authService: AuthService,
    private navController: NavController
  ) {
    this.formBuilder = new FormBuilder();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])),
      password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)]))
    })
  }

  loginUser(value) {
    console.log("value:", value);

  }

  goToRegister(){
    console.log("Registrar");
  }


}
