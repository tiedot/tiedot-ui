let Node = require('basis.ui').Node;
let ajax = basis.require('basis.net.ajax');

module.exports = Node.subclass({
    template: resource('./item.tmpl'),

    binding: {
        title: 'data:',
    },
    action: {
        click() {
            console.log( this );
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
    }
});