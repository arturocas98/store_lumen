import { AlertController, LoadingController, NavController } from "@ionic/angular";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MyValidators {

    constructor(

        public loadingController: LoadingController,
        public alertCtrl: AlertController,
        private navCtr: NavController,
    ) {

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

    async presentAlertSuccess(route?) {
        const alert = await this.alertCtrl.create({
            header: 'Exitoso ✔ ',
            subHeader: "Se ha registrado correctamente la información",
            buttons: [{
                text: 'Aceptar',
                handler: () => {
                    if (route != undefined) {
                        this.navCtr.navigateBack(route);
                    }

                }
            }]
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();
    }

    // Show the loader for infinite time
    showLoader(mensaje?) {

        this.loadingController.create({
            message: mensaje
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

    public soloLetras(e) {
        // console.log(e);
        let key = e.keyCode || e.which;
        let tecla = String.fromCharCode(key).toLowerCase();
        let letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
        let especiales: any;
        especiales = "8-37-39-46";

        let tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (letras.indexOf(tecla) == -1 && !tecla_especial) {
            return false;
        }
    }

}