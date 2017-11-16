let Node = require('basis.ui').Node;
let dataCollection = require('app.type.collection')
let STATE = require('basis.data').STATE;
let Value = require('basis.data').Value;

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
          action : {
            chooseCollection(target) {
                console.log('Hello it me ', this.data.title)
            }
        }
    },
    binding : {
        loading: Value.query('childNodesState').as(state => state == STATE.PROCESSING),
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