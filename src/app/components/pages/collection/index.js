let Node = require('basis.ui').Node;
let dataCollection = require('app.type.collection')


module.exports = new Node({
    // active: basis.PROXY,
    active: true,
    template: resource('./template.tmpl'),
    childClass: {
        template: resource('./item.tmpl'),
        binding: {
            title: 'data:'
        },
         data : {
            title : "test"
        },
    },
    
    // handler: {
    //     activeChanged() {
    //         if (this.active) {
    //             this.dataSource.deprecate();
    //         }
    //     }
    // },
    dataSource: dataCollection,
});