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
                    this.navCtr.navigateBack(route);

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

}