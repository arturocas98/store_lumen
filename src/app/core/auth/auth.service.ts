import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/Usuario';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public login: string;
  public registro: string;
  public api:string;
  constructor(
    private http: HttpClient,
    private afa: AngularFireAuth
  ) {
    this.login = environment.login;
    this.registro = environment.registro;
    this.api = environment.URL_API;
  }

  getAll(){
    let url = this.api +"/usuarios/";
    return this.http.get(url);
  }

  getByFilter(query?){
    let url = this.api +"/usuarios/filter"+query;
    return this.http.get(url);
  }

  registerAuth(usuario: Usuario) {
    return this.http.post(this.registro, usuario);
    // return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFUmp4pVUx2huv5vVklwvO59RFluzTlBw`, {
    //   method: 'POST',
    //   headers: {
    //     "Content-type": "application/json; charset=utf-8",
    //   },
    //   body: JSON.stringify(usuario)
    // })
    //   .then(response => response.json());

    // return this.afa.createUserWithEmailAndPassword(email,password);
  }

  registerDatabase(usuario:Usuario){
    let url = this.api + "/usuarios/registro";
    return this.http.post(url,usuario);
  }


}
