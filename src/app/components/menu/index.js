let Node = require('basis.ui').Node;
let Value = require('basis.data').Value;
let router = require('basis.router');
let currentPage = Value.from(router.route(':page').param('page'));
let pages = require('../pages/index');

let page = router
    .route(':page')
    .param('page')
    .as(function(page) {
        return pages[page] || pages[''];
    });

module.exports = Node.subclass({
    template: resource('./template.tmpl'),
    childClass: {
        template: resource('./item.tmpl'),
        selected: currentPage.compute((node, page) => node.url == page),
        binding: {
            title: 'title',
            content:'satellite:'
        },
        satellite: {
            content: page
        },
        action: {
            click() {
                router.navigate(this.url);
            }
        }
    },
    childNodes: [
        {title: 'Home', url: 'home'},
        {title: 'Collection', url: 'col'},
    ]
});

