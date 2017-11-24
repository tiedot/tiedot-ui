let Node = require('basis.ui').Node;
let ajax = basis.require('basis.net.ajax');
let Value = require('basis.data').Value;
let settings = require('../../../settings/server-config.json');
let router = require('basis.router');
let currentPage = Value.from(router.route(':page').param('page'));

// let currentCollection = new Value();

module.exports = Node.subclass({
    template: resource('./item.tmpl'),
    selected: currentPage.compute((node, page) => node.data.title == page),
    binding: {
        title: 'data:',
    },
    handler: {
        ownerChanged() {
            if (this.owner) {
                console.log(  this.dataSource);
                // this.dataSource.deprecate();
            }
        }
    },
    action: {
        click() {
            router.navigate(this.data.title);

            this.parentNode.update({loadingDoc:true});
            // currentCollection.set(this.data.title);

            ajax.request({
                url: 'http://localhost:8080/getpage?col=' + this.data.title  + '&page=0&total=1',
                handler: {
                    success: (transport, request, response) => {
                        this.parentNode.update({
                            loadingDoc:false,
                            dataSetDoc: response
                        });
                        // -------------
                        let container = document.querySelector('.json_area');
                        this.parentNode.data.editor && this.parentNode.data.editor.destroy();
                        this.parentNode.data.editor = new JSONEditor(container, {});
                        this.parentNode.data.editor.set(response);
                    },
                }
            });
        },
        remove(){
            this.parentNode.dataSource.remove(this.tmpl.collection.innerText);
        },
        rename(){
            this.parentNode.satellite.modalCreateCol.urlFn = function (inputValue, oldInput) {
                return `${settings.host}/rename?old=${oldInput}&new=${inputValue}`
            };
            this.parentNode.satellite.modalCreateCol.update({
                oldInput: this.tmpl.collection.innerText,
            });

            this.parentNode.satellite.modalCreateCol.select();
        }
    }
});