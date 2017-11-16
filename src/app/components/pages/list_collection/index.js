let Node = require('basis.ui').Node;
let dataCollection = require('app.type.collection')
let STATE = require('basis.data').STATE;
let Value = require('basis.data').Value;
let router = require('basis.router');


module.exports = new Node({
    template: resource('./template.tmpl'),
    data : {
        title : 'test title'
    },
    binding : {
        title:'data:'
    },
});