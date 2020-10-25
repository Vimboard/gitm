import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

import { Button } from "./leaflet/button";
import { ZoomMin } from "./leaflet/zoom.min";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      zoomControl: false
    }).setView([-20, 20], 4);

    L.tileLayer('assets/map/{z}/map{z}-{y}x{x}.png', {
      attribution: 'Test Map',
      continuousWorld: true,
      maxZoom: 7,
      minZoom: 4,
      tileSize: 128,
      tms: true
    }).addTo(this.map);

    var marker1 = L.marker([0, 0]).addTo(this.map);
    var marker2 = L.marker([-20, 20]).addTo(this.map);

    var circle = L.circle([-10, 10], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 1
    }).addTo(this.map);


    var myButtonOptions = {
      'text': 'MyButton',  // string
      'iconUrl': '/leaflet/images/layers.png',  // string
      'onClick': my_button_onClick,  // callback function
      'hideText': true,  // bool
      'maxWidth': 30,  // number
      'doToggle': false,  // bool
      'toggleStatus': false  // bool
    }

    var myButton = new Button(myButtonOptions).addTo(this.map);

    function my_button_onClick() {
      window.alert("someone clicked my button");
    }

    this.map.addControl(new ZoomMin());
    this.map.addControl(new ZoomMin());
  }
}
