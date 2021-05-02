import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/home', icon: 'pie-chart' },
    { title: 'Compras', url: '/compras', icon: 'arrow-down' },
    { title: 'Ventas', url: '/ventas', icon: 'arrow-up' },
    { title: 'Inventario', url: '/inventario', icon: 'archive' },
    { title: 'Producto', url: '/producto', icon: 'Cube' },
    { title: 'Categoría', url: '/categoria', icon: 'file-tray-full' },
    { title: 'Unidad de medida', url: '/unidad-medida', icon: 'trending-up' },

    { title: 'Cerrar sesión', url: '/login', icon: 'log-out' },
  ];
  constructor() { }
}
