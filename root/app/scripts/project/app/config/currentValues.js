'use strict';

var CurrentValues = function (){

  /**
   * Viewport object
   * @type {Object}
   */
  this.viewport = { width: 0, height: 0 };

  /**
   * Mouse object
   * @type {Object}
   */
  this.mouse = {x:0, y:0};

  /**
   * Is mouse out of window?
   * @type {boolean}
   */
  this.outWindow = false;

  /**
   * scroll Y value
   * @type {number}
   */
  this.scrollY = 0;

}



module.exports = new CurrentValues();