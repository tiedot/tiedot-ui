let  Node = require('basis.ui').Node;
let Menu = require('app.components.menu.collection.index');
let router = require('basis.router');
let jsonEditor = resource('./app/components/menu/document/index.js');

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
            jsonEditor:router.route('collect:page').param('page').as(() => jsonEditor)
        }
    });
  }
}).ready(() => {
    router.route('*page').param('page').as(page => page || router.navigate('', true));
});