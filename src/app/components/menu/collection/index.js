let Node = require('basis.ui').Node;
let router = require('basis.router');
let pages = require('../../pages/index');
let dataCollection = require('app.type.collection')
let Value = require('basis.data').Value;
let STATE = require('basis.data').STATE;
let ItemCollection = require('./item');
let modalCreateCollection = require('app.components.modals.collection.index');

module.exports = new Node({
    template: resource('./template.tmpl'),
    childClass: ItemCollection,
    data : {
        json : 'json-content',
        loadingDoc:false,
        contentCollection:true,
    },
    satellite : {
        modalCreateCol : modalCreateCollection,
    },
    binding: {
        modalCreateCol : 'satellite:',
        json : 'data:',
        loadingDoc:'data:',
        loading:Value.query('childNodesState').as(state => state == STATE.PROCESSING),
        contentCollection:'data:',
    },
    action : {
        createCollection(){
            this.satellite.modalCreateCol.select();
        }
    },
    dataSource: dataCollection,
});

