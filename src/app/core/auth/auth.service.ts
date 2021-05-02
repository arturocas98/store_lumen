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
  public api: string;
  public getUserData: string;
  constructor(
    private http: HttpClient,
    private afa: AngularFireAuth
  ) {
    this.login = environment.login;
    this.registro = environment.registro;
    this.api = environment.URL_API;
    this.getUserData = environment.getUserData;
  }

  getAll() {
    let url = this.api + "/usuarios/";
    return this.http.get(url);
  }

  getByFilter(orderBy?,equalTo?) {
    // let url = this.api + "/usuarios/filter" + query;
    // let url = this.api + "/usuario.json?orderBy="+"orderBy"+"&equalTo="+equalTo+"&print=pretty";
    return this.http.get(`${this.api}/usuario.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
    // return this.http.get(url);
  }

  registerAuth(usuario: Usuario) {
    return this.http.post(this.registro, usuario);

  }

  registerDatabase(usuario: Usuario) {
    // let url = this.api + "/usuarios/registro";
    let url = this.api+"/usuario.json";
    delete usuario.password;
    delete usuario.return_secure_token;
    return this.http.post(url, usuario);
  }

  loginAuth(usuario: Usuario) {
    return this.http.post(`${this.login}`, usuario);

  }

  updateUser(id:string,value:object) {
    // let url = this.api + "/usuarios/"+usuario.id;
    // let params = JSON.stringify(usuario);
    // return this.http.put(url,usuario);
    return this.http.patch(`${this.api}/usuario/${id}.json`, value);
  }

  authActivate() {

    return new Promise(resolve => {

      /*=============================================
        Validamos que el idToken sea real
        =============================================*/

      if (localStorage.getItem("idToken")) {

        let body = {

          idToken: localStorage.getItem("idToken")
        }

        this.http.post(`${this.getUserData}`, body)
          .subscribe(resp => {

            /*=============================================
              Validamos fecha de expiración
              =============================================*/

            if (localStorage.getItem("expiresIn")) {

              let expiresIn = Number(localStorage.getItem("expiresIn"));

              let expiresDate = new Date();
              expiresDate.setTime(expiresIn);

              if (expiresDate > new Date()) {

                resolve(true)

              } else {

                localStorage.removeItem('idToken');
                localStorage.removeItem('expiresIn');
                resolve(false)
              }

            } else {

              localStorage.removeItem('idToken');
              localStorage.removeItem('expiresIn');
              resolve(false)

            }


          }, err => {

            localStorage.removeItem('idToken');
            localStorage.removeItem('expiresIn');
            resolve(false)

          })

      } else {

        localStorage.removeItem('idToken');
        localStorage.removeItem('expiresIn');
        resolve(false)
      }

    })

  }


}
