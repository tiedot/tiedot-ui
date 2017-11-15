let Node = require('basis.ui').Node;
let dataCollection = require('app.type').Collection

module.exports = Node.subclass({
    // active: basis.PROXY,
    active: true,
    template: resource('./template.tmpl'),
    childClass: {
        template: resource('./item.tmpl'),
        binding: {
            title: 'title'
        },
    },
    // handler: {
    //     activeChanged() {
    //         if (this.active) {
    //             this.dataSource.deprecate();
    //         }
    //     }
    // },
    dataSource: dataCollection.all,
    childNodes: [
        {title: 'Home'},
        {title: 'Collection'},
    ]
});