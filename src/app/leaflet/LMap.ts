import * as L from 'leaflet';

import { CreateMarkerController } from "./controller/CreateMarkerController";
import { DefaultController } from "./controller/DefaultController";
import type { LMapController, LMapControllers } from "./controller/LMapController";
import { MoveMarkerController } from "./controller/MoveMarkerController";

export class LMap {

  private _obj;

  private controller: LMapController;
  private controllers: LMapControllers;

  constructor() {
    var mapObj = this._obj = L.map('map', {
      crs: L.CRS.Simple,
      zoomControl: false
    }).setView([-20, 20], 4);

    L.tileLayer('assets/map/{z}/map{z}-{y}x{x}.png', {
      attribution: 'Test LMap',
      continuousWorld: true,
      maxZoom: 7,
      minZoom: 4,
      tileSize: 128,
      tms: true
    }).addTo(mapObj);

    this.controllers = {
      default: new DefaultController(this),
      createMarker: new CreateMarkerController(this),
      moveMarker: new MoveMarkerController(this)
    }
    this.controller = this.controllers.default;
    this.controller.activate();

    mapObj.on('click', fn(this.onClick, this));
  }

  get obj() {
    return this._obj;
  }

  activateDefault() {
    this.controller.finalize();
    this.controller = this.controllers.default;
    this.controller.activate();
  }

  activateCreateMarker() {
    this.controller.finalize();
    this.controller = this.controllers.createMarker;
    this.controller.activate();
  }

  activateMoveMarker() {
    this.controller.finalize();
    this.controller = this.controllers.moveMarker;
    this.controller.activate();
  }

  onClick(event) {
    this.controller.onClick(event);
  }
}

function fn(func, context) {
  return function () {
    func.call(context);
  }
}
