let Node = require('basis.ui').Node;
let Value = require('basis.data').Value;
let router = require('basis.router');
let currentPage = Value.from(router.route(':page').param('page'));

module.exports = Node.subclass({
    template: resource('./template.tmpl'),
    childClass: {
        template: resource('./item.tmpl'),
        selected: currentPage.compute((node, page) => node.url == page),
        binding: {
            title: 'title'
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