import { LMap } from "../LMap";
import type { LMapController } from './LMapController';

export class DefaultController implements LMapController {

  private map;
  private oldCursor;

  constructor(map: LMap) {
    this.map = map;
    this.oldCursor = map.obj._container.style.cursor;
  }

  activate() {
    this.map.obj._container.style.cursor = this.oldCursor;
  }

  finalize() {}

  onClick() {}
}
