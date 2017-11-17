let Node = require('basis.ui').Node;
let Value = require('basis.data').Value;
let router = require('basis.router');
let currentPage = Value.from(router.route(':page').param('page'));
let pages = require('../pages/index');
let Collection = require('app.components.pages.collection.index')
let dataCollection = require('app.type.collection')

// let page = router
//     .route(':page')
//     .param('page')
//     .as(function(page) {
//         console.log( page );
//         return pages[page] || pages[''];
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
                router.navigate(this.url);
            }
        },
    },

    // binding: {
    //     content: 'satellite:',
    // },
    // satellite: {
    //     content: page
    // },
    dataSource: dataCollection,
    // childNodes: [
    //     {title: 'Home', url: 'home'},
    //     {title: 'Collection', url: 'col'},
    //    {title: 'Settings', url: 'setting'},
    // ]
});

