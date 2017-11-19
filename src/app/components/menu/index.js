let Node = require('basis.ui').Node;
let router = require('basis.router');
let pages = require('../pages/index');
let dataCollection = require('app.type.collection')
let ajax = basis.require('basis.net.ajax');
let Value = require('basis.data').Value;
let STATE = require('basis.data').STATE;

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
                            new PrettyJSON.view.Node({
                                el:document.querySelector('.json_area'),
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
        loading:Value.query('childNodesState').as(state => state == STATE.PROCESSING),
        contentCollection:'data:',
    },
    dataSource: dataCollection,
});

