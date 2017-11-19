let Node = require('basis.ui').Node;
let router = require('basis.router');
let pages = require('../pages/index');
let dataCollection = require('app.type.collection')
let dataDocument= require('app.type.document')
let documents = require('app.components.menu.document.index')
var ajax = basis.require('basis.net.ajax');

module.exports = new Node({
    template: resource('./template.tmpl'),
    childClass: {
        template: resource('./item.tmpl'),
        binding: {
            title: 'data:',
        },
        action: {
            click() {
                ajax.request({
                    url: 'http://localhost:8080/getpage?col=' + this.data.title  + '&page=0&total=1',
                    params: {
                        userId: 123
                    },
                    handler: {
                        success: function(transport, request, response){
                            var obj = {
                                name:'John Doe',
                                age: 20,
                                children:[{name:'Jack', age:5}, {name:'Ann', age:8}],
                                wife:{name:'Jane Doe', age:28 }
                            }

                            var node = new PrettyJSON.view.Node({
                                el:$('.json_area'),
                                data:response
                            });
                        },
                    }
                });


            }
        },
    },
    data : {
        json : 'json-content',
        contentCollection:true,
    },
    binding: {
        json : 'data:',
        // documents: 'satellite:',
        contentCollection:'data:',
    },
    satellite: {
        documents: documents
    },
    dataSource: dataCollection,
});

