let Node = require('basis.ui').Node;
let router = require('basis.router');
let pages = require('../pages/index');
let dataCollection = require('app.type.collection')
let documents = require('app.components.menu.document.index')

module.exports = new Node({
    template: resource('./template.tmpl'),
    childClass: {
        template: resource('./item.tmpl'),
        binding: {
            title: 'data:',
        },
        action: {
            click() {
                router.navigate(this.data.title);
            }
        },
    },
    data : {
        contentCollection:true,
    },
    binding: {
        documents: 'satellite:',
        contentCollection:'data:',
    },
    satellite: {
        documents: documents
    },
    dataSource: dataCollection,
});

