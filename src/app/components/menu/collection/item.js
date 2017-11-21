let Node = require('basis.ui').Node;
let ajax = basis.require('basis.net.ajax');
let Value = require('basis.data').Value;
let currentCollection = new Value();
var STATE = basis.require('basis.data').STATE;

module.exports = Node.subclass({
    template: resource('./item.tmpl'),
    selected: currentCollection.compute((child, name) => {
        return child.data.title === name;
    }),
    binding: {
        title: 'data:',
    },
    action: {
        click() {
            this.parentNode.update({loadingDoc:true});
            currentCollection.set(this.data.title);
            ajax.request({
                url: 'http://localhost:8080/getpage?col=' + this.data.title  + '&page=0&total=1',
                handler: {
                    success: (transport, request, response) => {
                        new PrettyJSON.view.Node({
                            el:document.querySelector('.json_area'),
                            data:response
                        });
                        this.parentNode.update({loadingDoc:false});
                    },
                }
            });
        },
        remove(){
            console.log( this );
            // ajax.request({
            //     url: `http://localhost:8080/drop?col=${this.tmpl.collection.innerText.trim()}`,
            //     handler: {
            //         success: (transport, request, response) => {
            //
            //         },
            //     }
            // });
        }
    }
});