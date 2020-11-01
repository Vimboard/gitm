export interface LMapController {

  activate();

  finalize();

  onClick(event: object);
}

export interface LMapControllers {

  readonly [key: string]: LMapController;
}
