var View    = require('dot-view').View,
    Routes  = require('../routes');

var controller = (function() {

  var Controller = function() {
    this.page = null;
    this.config = null;
    this.lang = 'en';
    this.datas = {};
    this.id = null;
  }

  Controller.prototype = {

    init: function(id, page, config) {
      this.id = id;
      this.page = page;
      this.config = config;
    },

    preAction: function(req, res) {
      
      this.setBaseUrl(req);
      this.setBasicDatas(req);
      this.setPageDatas(req);
      this.setHeaders(req, res);
      this.setMenu(req);

    },

    postAction: function(req, res) {
      req.setLocale(this.lang);
    },

    setBaseUrl: function(req) {

      this.lang = req.params.lang;

      var baseUrl = req.protocol + '://' + req.get('host');

      // Base url
      if (this.config.base_url.length) {

        if (this.config.base_url[0] == '/') {
          baseUrl += his.config.base_url[0];
        }

        if (this.config.base_url.indexOf('http')) {
          baseUrl = this.config.base_url;
        }
        
      } 
      
      // Maybe wrong here :/
      this.config.root =  '';

      this.config.base_url = baseUrl;
    },

    setBasicDatas: function(req) {

      //Reset
      this.datas = null;
      this.datas = {};

      // First, get config datas
      for (var prop in this.config) {
        this.datas[prop] = this.config[prop];
      }

      // Lang
      this.datas.lang = this.lang;

      // Is dev ?
      this.datas.use_src = this.config.use_src;
      
      // get device
      this.datas.device = req.device.type;
      this.datas.is_mobile = (this.datas.device == 'phone') ? true : false;

      // Menu
      this.datas.routes = Routes.aLangRoutes;
      
    },

    setPageDatas: function(req) {

      if (this.page == null) return;

      // get translated datas
      var translatedDatas = require(this.config.translationPath + this.lang + '/' + this.page.id + '.json');
      for (var prop in translatedDatas) {
        this.datas[prop] = translatedDatas[prop];
      }

      // Display layout?
      if (this.page.hasLayout == undefined || this.page.hasLayout)
        this.datas.layout = new View(this.config.tplLayoutPath, 'layout.html', this.datas);

    },

    setHeaders: function(req, res) {

      if (this.page == null) return;

      var headers = req.headers['user-agent'];

      if (headers.indexOf('MSIE') > -1) {
        res.setHeader('X-UA-Compatible', 'IE=edge,chrome=1');
        this.datas.hasCompatibleMetaHeader = true;
      }
    },

    setMenu: function(req) {
      if (this.page == null) return;
    }

  }


  return Controller;

})();

module.exports = controller;