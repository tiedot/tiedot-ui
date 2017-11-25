let Node = require('basis.ui').Node;
let dataDocument = require('app.type.document')

module.exports = new Node({
    active:basis.PROXY,
    template: resource('./template.tmpl'),
    action : {

    },
    data : {
        prettyJson : '',
    },
    childClass: {
        binding: {
            number: 'data:',
        },
    },
    dataSource: dataDocument,
});