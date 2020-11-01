import { LMap } from "../LMap";
import type { LMapController } from './LMapController';
import { LMapCursor } from "../LMapCursor";

export class CreateMarkerController implements LMapController {

  private map;

  constructor(map: LMap) {
    this.map = map;
  }

  activate() {
    this.map.obj._container.style.cursor =
        LMapCursor[LMapCursor.crosshair];
  }

  finalize() {}

  onClick() {
    // map.obj.on('click', function(e) {
    //   L.marker(e.latlng).addTo(map.obj);
    // });

    // var marker1 = L.marker([0, 0]).addTo(map.obj);
    // var marker2 = L.marker([-20, 20]).addTo(map.obj);
    //
    // var circle = L.circle([-10, 10], {
    //   color: 'red',
    //   fillColor: '#f03',
    //   fillOpacity: 0.5,
    //   radius: 1
    // }).addTo(map.obj);

  }
}
