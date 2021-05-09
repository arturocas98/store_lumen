import { Component, OnInit } from '@angular/core';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { CategoriaService } from 'src/app/core/categoria/categoria.service';
import { MyValidators } from '../../config/MyValidators.service';
import { CategoriaAdd } from './categoria-add/categoria-add.page';
import { CategoriaEdit } from './categoria-edit/categoria-edit.page';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  categorias: Array<any> = [];
  idCategorias: Array<any> = [];
  constructor(
    public alertCtrl: AlertController,
    public my_validators: MyValidators,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.getAll();
  }


  public getAll() {
    this.categoriaService.getAll().subscribe((resp: any) => {
      console.log("resp:", resp);
      if (resp != null) {
        this.idCategorias = Object.keys(resp).toString().split(",");
        for (const i in resp) {
          this.categorias.push(resp[i]);
        }
      } else {
        this.categorias = [];
        this.idCategorias = [];
      }

    }, err => {
      this.categorias = [];
    });
  }


  public getAllByFilter(nombre?) {
    this.categoriaService.getByFilter("nombre", nombre).subscribe(resp => {
      if (resp != null) {
        this.idCategorias = Object.keys(resp).toString().split(",");
        for (const i in resp) {
          this.categorias.push(resp[i]);
        }
      } else {
        this.categorias = [];
        this.idCategorias = [];
      }

    }, err => {
      this.categorias = [];
    });
  }

  public async add() {
    const modal = await this.modalController.create({
      component: CategoriaAdd,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    modal.onDidDismiss().then(resp => {
      this.categorias = [];
      this.getAll();
    });

    return await modal.present();

  }

  public async edit(IdUnidad) {
    const modal = await this.modalController.create({
      component: CategoriaEdit,
      componentProps: {
        id: IdUnidad,
      }
    });

    modal.onDidDismiss().then(resp => {
      this.categorias = [];
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

    this.categoriaService.delete(id, localStorage.getItem('idToken')).subscribe(resp => {

      let p1s = this.my_validators.hideLoader();
      let p2s = this.my_validators.presentAlertSuccess();
      Promise.all([p1s, p2s]);

      this.categorias = [];
      this.getAll();
    });
  }


  search(value) {
    if (value) {
      this.categorias = [];
      return this.getAllByFilter(value.toLowerCase());
    } else {
      this.categorias = [];
      return this.getAll();
    }

  }

  clear() {
    this.categorias = [];
    this.getAll();
  }

}
