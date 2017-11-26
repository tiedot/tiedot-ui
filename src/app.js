let  Node = require('basis.ui').Node;
let Menu = require('app.components.menu.collection.index');
let router = require('basis.router');
let STATE = require('basis.data').STATE;
let Value = require('basis.data').Value;

module.exports = require('basis.app').create({
  title: 'Tiedot',
  init: function(){
    return new Node({
      template: resource('./app/template/layout.tmpl'),
      binding: {
        loadIcon:Value.query(Menu, 'childNodesState').as(state  => state == STATE.READY),
        menu: 'satellite:',
      },
        satellite: {
            menu: Menu,
        }
    });
  }
});