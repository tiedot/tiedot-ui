let Node = require('basis.ui').Node;
let router = require('basis.router');
let dataCollection = require('app.type.collection')
let Value = require('basis.data').Value;
let STATE = require('basis.data').STATE;
let ItemCollection = require('./item');
let settings = require('../../../settings/server-config.json');
let modalCreateCollection = require('app.components.modals.collection.index');

module.exports = new Node({
    active: true,
    template: resource('./template.tmpl'),
    childClass: ItemCollection,
    dataSource: dataCollection,
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
            this.satellite.modalCreateCol.urlFn = function (inputValue) {
             return `${settings.host}/create?col=${inputValue}`
             },
            this.satellite.modalCreateCol.select();
        },
    },
});

