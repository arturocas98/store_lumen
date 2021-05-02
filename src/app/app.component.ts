import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  darkActive : boolean ;
  public appPages = [
    { title: 'Dashboard', url: '/home', icon: 'pie-chart' },
    { title: 'Compras', url: '/compras', icon: 'arrow-down' },
    { title: 'Ventas', url: '/ventas', icon: 'arrow-up' },
    { title: 'Inventario', url: '/inventario', icon: 'archive' },
    { title: 'Producto', url: '/producto', icon: 'Cube' },
    { title: 'Categoría', url: '/categoria', icon: 'file-tray-full' },
    { title: 'Unidad de medida', url: '/unidad-medida', icon: 'trending-up' },
    { title: 'Modo oscuro', url: '/unidad-medida', icon: 'moon' },
    { title: 'Cerrar sesión', url: '/login', icon: 'log-out' },
  ];
  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme:dark)');
    this.darkActive = prefersDark.matches;

   }

  darkMode() {
    this.darkActive = ! this.darkActive;
    document.body.classList.toggle('dark');
    // console.log(event);
  }

  logOut() {
    console.log("cerrando sesion ... ");
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresIn');
    window.open('login', '_top')
  }
}
