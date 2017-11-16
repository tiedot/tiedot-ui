let Node = require('basis.ui').Node;
let Value = require('basis.data').Value;
let router = require('basis.router');
let currentPage = Value.from(router.route(':page').param('page'));
let pages = require('../pages/index');
let Collection = require('app.components.pages.collection.index')


let page = router
    .route(':page')
    .param('page')
    .as(function(page) {
        return pages[page] || pages[''];
    });

// router list collection
router.add('list-col//:filter', {
  match: function(id){ page.set(id) },
});

module.exports = new Node({
    template: resource('./template.tmpl'),
    childClass: {
        template: resource('./item.tmpl'),
        selected: currentPage.compute((node, page) => node.url == page),
        binding: {
            title: 'title',
        },
        action: {
            click() {
                router.navigate(this.url);
            }
        },
    },
    binding: {
        content: 'satellite:',
    },
    satellite: {
        content: page
    },
    childNodes: [
        {title: 'Home', url: 'home'},
        {title: 'Collection', url: 'col'},
       {title: 'Settings', url: 'setting'},
    ]
});

