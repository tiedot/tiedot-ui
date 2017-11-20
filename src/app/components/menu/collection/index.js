let Node = require('basis.ui').Node;
let router = require('basis.router');
let pages = require('../../pages/index');
let dataCollection = require('app.type.collection')
let Value = require('basis.data').Value;
let STATE = require('basis.data').STATE;
let ItemCollection = require('./item');

module.exports = new Node({
    template: resource('./template.tmpl'),
    childClass: ItemCollection,
    data : {
        json : 'json-content',
        contentCollection:true,
    },
    binding: {
        json : 'data:',
        loading:Value.query('childNodesState').as(state => state == STATE.PROCESSING),
        contentCollection:'data:',
    },
    dataSource: dataCollection,
});

