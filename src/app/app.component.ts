import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/home', icon: 'pie-chart' },
    { title: 'Compras', url: '/folder/Outbox', icon: 'arrow-down' },
    { title: 'Ventas', url: '/folder/Favorites', icon: 'arrow-up' },
    { title: 'Inventario', url: '/folder/Archived', icon: 'archive' },
    { title: 'Producto', url: '/folder/Trash', icon: 'Cube' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  constructor() { }
}
