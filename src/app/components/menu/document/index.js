let Node = require('basis.ui').Node;

module.exports = new Node({
    template: resource('./template.tmpl'),
    childClass: {
        // selected: currentPage.compute((node, page) => node.url == page),
        binding: {
            number: 'data:',
        },
    },
    // dataSource: dataCollection,
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