let Node = require('basis.ui').Node;
let ajax = basis.require('basis.net.ajax');
let Value = require('basis.data').Value;
let currentCollection = new Value();

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
            this.parentNode.dataSource.remove(this.tmpl.collection.innerText);
        }
    }
});