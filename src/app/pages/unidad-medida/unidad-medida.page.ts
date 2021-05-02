import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { MyValidators } from 'src/app/config/MyValidators.service';
import { UnidadMedidaService } from 'src/app/core/unidad-medida/unidad-medida.service';
import { UnidadMedidaAdd } from './unidad-medida-add/unidad-medida-add.page';
import { UnidadMedidaEdit } from './unidad-medida-edit/unidad-medida-edit.page';

@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.page.html',
  styleUrls: ['./unidad-medida.page.scss'],
})
export class UnidadMedidaPage implements OnInit {
  unidades: Array<any> = [];
  idUnidades: Array<any> = [];
  constructor(
    private unidadService: UnidadMedidaService,
    private router: Router,
    public alertCtrl: AlertController,
    public my_validators: MyValidators,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
    this.getAll();
  }

  public getAll() {
    this.unidadService.getAll().subscribe((resp: any) => {
      // console.log("resp:", resp);
      if (resp != null) {
        this.idUnidades = Object.keys(resp).toString().split(",");
        for (const i in resp) {
          this.unidades.push(resp[i]);
        }
      }else{
        this.unidades = [];
        this.idUnidades = [];
      }

    }, err => {
      this.unidades = [];
    });
  }

  public getAllByFilter(nombre?) {
    this.unidadService.getByFilter("nombre", nombre).subscribe(resp => {
      if(resp!=null){
        this.idUnidades = Object.keys(resp).toString().split(",");
        for (const i in resp) {
          this.unidades.push(resp[i]);
        }
      }else {
        this.unidades = [];
        this.idUnidades = [];
      }
      
    }, err => {
      this.unidades = [];
    });
  }

  public async add() {
    const modal = await this.modalController.create({
      component: UnidadMedidaAdd,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    modal.onDidDismiss().then(resp => {
      this.unidades = [];
      this.getAll();
    });

    return await modal.present();

  }

  public async edit(IdUnidad) {
    // this.router.navigate(['/unidad-medida/unidadEdit/' + id]);
    const modal = await this.modalController.create({
      component: UnidadMedidaEdit,
      componentProps: {
        id: IdUnidad,
      }
    });

    modal.onDidDismiss().then(resp => {
      this.unidades = [];
      this.getAll();
    });

    return await modal.present();
  }

  async presentAlertEliminacion(id) {
    const alert = await this.alertCtrl.create({
      header: 'Esta seguro que desea eliminar el siguiente registro?',
      subHeader: "",
      buttons: [

        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.delete(id);
          },
        }

      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  public delete(id) {
    this.my_validators.showLoader("Eliminando...");

    this.unidadService.delete(id, localStorage.getItem('idToken')).subscribe(resp => {

      let p1s = this.my_validators.hideLoader();
      let p2s = this.my_validators.presentAlertSuccess();
      Promise.all([p1s, p2s]);

      this.unidades = [];
      this.getAll();
    });
  }

  search(value) {
    if (value) {
      this.unidades = [];
      return this.getAllByFilter(value.toLowerCase());
    } else {
      this.unidades = [];
      return this.getAll();
    }

  }

  clear() {
    this.unidades = [];
    this.getAll();
  }

}
