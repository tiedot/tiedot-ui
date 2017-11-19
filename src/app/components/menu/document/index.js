let Node = require('basis.ui').Node;
// let dataDocument = require('app.type.document')

module.exports = new Node({
    active:true,
    template: resource('./template.tmpl'),
    action : {
        // chooseCollection() {
        //     var obj = {
        //         name:'John Doe',
        //         age: 20,
        //         children:[{name:'Jack', age:5}, {name:'Ann', age:8}],
        //         wife:{name:'Jane Doe', age:28 }
        //     }
        //
        //     var node = new PrettyJSON.view.Node({
        //         el:$('.json_area'),
        //         data:obj
        //     });
        // }
    },
    data : {
        prettyJson : '',
    },
    childClass: {
        binding: {
            number: 'data:',
        },
    },
    // dataSource: dataDocument,
});

// var obj = {
//     name:'John Doe',
//     age: 20,
//     children:[{name:'Jack', age:5}, {name:'Ann', age:8}],
//     wife:{name:'Jane Doe', age:28 }
// }
//
// var node = new PrettyJSON.view.Node({
//     el:$('.json_area'),
//     data:obj
// });