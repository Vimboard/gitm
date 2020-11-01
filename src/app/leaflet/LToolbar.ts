import * as L from 'leaflet';

import { LMap } from './LMap';

/*
 * @class Control.LToolbar
 * @aka L.Control.LToolbar
 * @inherits Control
 *
 * A basic toolbar control with custom buttons. Based on `Zoom`. Extends `Control`.
 */

var L_Toolbar = L.Control.extend({

  options: {
    position: 'topleft'
  },

  initialize: function (options) {
    L.Util.setOptions(this, options);
    this._buttons = [];
  },

  onAdd: function () {
    var zoomName = 'leaflet-control-zoom',
      container = L.DomUtil.create('div', zoomName + ' leaflet-bar'),
      options = this.options;

    if (options.buttons) {
      for (var i = 0; i < options.buttons.length; i++) {
        var buttonOptions = options.buttons[i];
        var button = this._createButton(buttonOptions.text, buttonOptions.title,
          zoomName + '-in', container, buttonOptions.fn);
        this._buttons.push(button);
      }
    }

    this._updateDisabled();

    return container;
  },

  onRemove: function () {
  },

  disable: function () {
    this._disabled = true;
    return this;
  },

  enable: function () {
    this._disabled = false;
    return this;
  },

  _createButton: function (html, title, className, container, fn) {
    var link = L.DomUtil.create('a', className, container);
    link.innerHTML = html;
    link.href = '#';
    link.title = title;

    /*
     * Will force screen readers like VoiceOver to read this as "Zoom in - button"
     */
    link.setAttribute('role', 'button');
    link.setAttribute('aria-label', title);

    L.DomEvent.disableClickPropagation(link);
    L.DomEvent.on(link, 'click', L.DomEvent.stop);
    L.DomEvent.on(link, 'click', fn, this);
    L.DomEvent.on(link, 'click', this._refocusOnMap, this);

    return link;
  },

  _updateDisabled: function () {
    var map = this._map,
      className = 'leaflet-disabled';

    for (var i = 0; i < this._buttons.length; i++) {
      var button = this._buttons[i];
      L.DomUtil.removeClass(button, className);
      if (this._disabled) {
        L.DomUtil.addClass(this._zoomOutButton, className);
      }
    }
  }
});

export interface ToolbarButtonOptions {
  text: string;
  title: string;
  fn: () => void;
}

export interface ToolbarOptions {
  buttons: ToolbarButtonOptions[];
  map: LMap;
}

export class LToolbar {

  private _obj;

  constructor(options: ToolbarOptions) {
    var toolbarObj = this._obj = new L_Toolbar(options);
    toolbarObj.addTo(options.map.obj);
  }

  get obj() {
    return this._obj;
  }
}
