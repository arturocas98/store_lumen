import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UnidadMedida } from 'src/app/models/unidad-medida';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    public api: string;
    constructor(
        private http: HttpClient,
    ) {
        this.api = environment.URL_API;
    }

    getAll() {
        let url = this.api + "/categoria.json";
        return this.http.get(url);
    }

    getById(id) {
        let url = this.api + "/categoria/" + id + ".json";
        return this.http.get(url);
    }

    getByFilter(orderBy, equalTo?) {
      
        let url = `${this.api}/categoria.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`;
        return this.http.get(url);
    }


    register(unidad, idToken) {
        let url = this.api + "/categoria.json?auth=" + idToken;
        return this.http.post(url, unidad);
    }

    update(id: String, value: Object, idToken: string) {

        return this.http.patch(`${this.api}/categoria/${id}.json?auth=${idToken}`, value);

    }

    delete(id: string, idToken: string) {

        return this.http.delete(`${this.api}/categoria/${id}.json?auth=${idToken}`);

    }



}
