import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { MyValidators } from 'src/app/config/MyValidators.service';
import { CategoriaService } from 'src/app/core/categoria/categoria.service';

@Component({
    selector: 'app-categoria-edit',
    templateUrl: './categoria-edit.page.html',
    styleUrls: ['./categoria-edit.page.scss'],
})
export class CategoriaEdit implements OnInit {
    categoriaForm: FormGroup;
    validation_messages: any;
    idCategoria: any;
    categoria: any;
    constructor(
        private formBuilder: FormBuilder,
        private my_validators: MyValidators,
        private categoriaService: CategoriaService,
        private navParams: NavParams,
        private modalController: ModalController
    ) { }

    ngOnInit() {
        this.initForm();
        this.validaciones();
        this.getUnidad();
    }
    getUnidad() {
        return new Promise((resolve, reject) => {
            this.idCategoria = this.navParams.data.id;
            this.categoriaService.getById(this.idCategoria).subscribe(resp => {
                this.categoria = resp;
                this.setValueForm();
            });
        });
    }

    setValueForm() {
        this.categoriaForm.setValue({
            nombre: this.categoria.nombre
        });
    }

    initForm() {
        this.categoriaForm = this.formBuilder.group({

            nombre: new FormControl(
                "", Validators.compose([
                    Validators.required,
                    Validators.maxLength(50)
                    // Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
                ])
            ),


        });
    }

    validaciones() {
        this.validation_messages = {
            nombre: [
                { type: "required", message: "El nombre es requerido" },
                { type: "maxlength", message: "Sólo se permiten de 50 letras para el nombre" }
            ],


        }
    }

    register(value) {
        this.my_validators.showLoader("Actualizando....");
        this.categoriaService.update(this.idCategoria, value, localStorage.getItem("idToken")).subscribe(resp => {
            let p1s = this.my_validators.hideLoader();
            let p2s = this.my_validators.presentAlertSuccess("categoria");
            Promise.all([p1s, p2s]);
        });
    }


    async goToList() {
        await this.modalController.dismiss();
    }



}
