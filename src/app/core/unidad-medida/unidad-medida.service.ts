import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UnidadMedida } from 'src/app/models/unidad-medida';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UnidadMedidaService {
    public login: string;
    public registro: string;
    public api: string;
    constructor(
        private http: HttpClient,
    ) {
        this.login = environment.login;
        this.registro = environment.registro;
        this.api = environment.URL_API;
    }

    getAll() {
        // let url = this.api + "/unidad-medida/";
        let url = this.api + "/unidad_medida.json";
        return this.http.get(url);
    }

    getById(id) {
        let url = this.api + "/unidad_medida/" + id + ".json";
        return this.http.get(url);
    }

    getByFilter(orderBy, equalTo?) {
        // let url = this.api + "/unidad-medida/filter" + query;
        // return this.http.get(url);
        let url = `${this.api}/unidad_medida.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`;
        return this.http.get(url);
        // .pipe(
        //     map((resp: any) => {

        //         let newResp = [];
        //         let count = 0;

        //         for (const i in resp) {

        //             count++;

        //             newResp.push(resp[i].nombre.toLowerCase());

        //         }

        //         if (count == Object.keys(resp).length) {

        //             return newResp;
        //         }

        //     })


        // );

    }


    register(unidad, idToken) {
        // let url = this.api + "/unidad-medida/registro";
        let url = this.api + "/unidad_medida.json?auth=" + idToken;
        return this.http.post(url, unidad);
    }

    // update(unidadMedida) {
    //     let url = this.api + "/unidad-medida/" + unidadMedida.id;
    //     let params = JSON.stringify(unidadMedida);
    //     return this.http.put(url, unidadMedida);
    // }

    update(id: String, value: Object, idToken: string) {

        return this.http.patch(`${this.api}/unidad_medida/${id}.json?auth=${idToken}`, value);

    }

    delete(id: string, idToken: string) {

        return this.http.delete(`${this.api}/unidad_medida/${id}.json?auth=${idToken}`);

    }



}
