let  Node = require('basis.ui').Node;
let Menu = require('app.components.menu.collection.index');
let router = require('basis.router');
let jsonEditor = require('app.components.menu.document.index');

module.exports = require('basis.app').create({
  title: 'Tiedot',
  init: function(){
    return new Node({
      template: resource('./app/template/layout.tmpl'),
      binding: {
        menu: 'satellite:',
        jsonEditor:'satellite:'
      },
        satellite: {
            menu: Menu,
            jsonEditor:jsonEditor
        }
    });
  }
}).ready(() => {
    router.route('*page').param('page').as(page => page || router.navigate('', true));
});