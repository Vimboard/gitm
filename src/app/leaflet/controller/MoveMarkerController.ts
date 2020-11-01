import { LMap } from "../LMap";
import type { LMapController } from './LMapController';

export class MoveMarkerController implements LMapController {

  private map;

  constructor(map: LMap) {
    this.map = map;
  }

  activate() {}

  finalize() {}

  onClick() {}
}
