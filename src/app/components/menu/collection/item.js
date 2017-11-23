let Node = require('basis.ui').Node;
let ajax = basis.require('basis.net.ajax');
let Value = require('basis.data').Value;
let Dataset = require('basis.data').Dataset;
let DataObject = require('basis.data').Object;
let currentCollection = new Value();
let settings = require('../../../settings/server-config.json');

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

                        this.parentNode.update({
                            loadingDoc:false,
                            dataSetDoc: new Dataset().set(new DataObject({
                                data : response
                            }))
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