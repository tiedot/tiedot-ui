let  Node = require('basis.ui').Node;
let Menu = require('app.components.menu.index');
let defaultRoute = 'home';

module.exports = require('basis.app').create({
  title: 'Tiedot',
  init: function(){
    return new Node({
      template: resource('./app/template/layout.tmpl'),
      binding: {
        menu: 'satellite:',
      },
        satellite: {
            menu: Menu
        }
    });
  }
}).ready(() => {
    router.route('*page').param('page').as(page => page || router.navigate(defaultRoute, true));
});;
