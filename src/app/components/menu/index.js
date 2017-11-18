let Node = require('basis.ui').Node;
// let Value = require('basis.data').Value;
let router = require('basis.router');
// let currentPage = Value.from(router.route(':page').param('page'));
let pages = require('../pages/index');
// let Collection = require('app.components.pages.collection.index')
let dataCollection = require('app.type.collection')
let documents = require('app.components.menu.document.index')
// let collection = router
//     .route(':collection')
//     .param('collection')
//     .as(function(collection) {
//         console.log( collection );
//         return pages[collection] || pages[''];
//     });

module.exports = new Node({
    template: resource('./template.tmpl'),
    childClass: {
        template: resource('./item.tmpl'),
        // selected: currentPage.compute((node, page) => node.url == page),
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

