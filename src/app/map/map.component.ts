import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";

import { LMap } from "../leaflet/LMap"
import { LToolbar } from "../leaflet/LToolbar";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  showFiller = false;

  @ViewChild('mapMenu')
  mapMenu: MatSidenav;

  private map: LMap;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    let map: LMap = this.map = new LMap();

    let menuBar: LToolbar = new LToolbar({
      buttons: [
        { text: '=', title: 'Menu', fn: fn(this.toggleMenu, this) }
      ],
      map: map
    });

    let toolBar: LToolbar = new LToolbar({
      buttons: [
        { text: 'D', title: 'Default', fn: fn(this.doDefault, this) },
        { text: 'C', title: 'Create marker', fn: fn(this.doCreateMarker, this) },
        { text: 'M', title: 'Move marker', fn: fn(this.doMoveMarker, this) }
      ],
      map: map
    });
  }

  private doDefault() {
    this.map.activateDefault();
  }

  private doCreateMarker() {
    this.map.activateCreateMarker();
  }

  private doMoveMarker() {
    this.map.activateMoveMarker();
  }

  private toggleMenu() {
    this.mapMenu.toggle()
  }
}

function fn(func, context) {
  return function () {
    func.call(context);
  }
}
