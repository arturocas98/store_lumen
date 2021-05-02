import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UnidadMedida } from 'src/app/models/unidad-medida';
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
        let url = this.api + "/unidad-medida/";
        return this.http.get(url);
    }

    getByFilter(query?) {
        let url = this.api + "/unidad-medida/filter" + query;
        return this.http.get(url);
    }


    register(unidad: UnidadMedida) {
        let url = this.api + "/unidad-medida/registro";
        return this.http.post(url, unidad);
    }

    update(unidadMedida) {
        let url = this.api + "/unidad-medida/" + unidadMedida.id;
        let params = JSON.stringify(unidadMedida);
        return this.http.put(url, unidadMedida);
    }




}
