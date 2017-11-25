let Node = require('basis.ui').Node;
let ajax = basis.require('basis.net.ajax');
let Value = require('basis.data').Value;
let settings = require('../../../settings/server-config.json');
let currentCollection = new Value();
let dataDocument = require('app.type.document');

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
            let collName = this.data.title;

            currentCollection.set(collName);
            dataDocument.get(collName).then(() => {
                 let container = document.querySelector('.json_area');
                 this.parentNode.data.editor && this.parentNode.data.editor.destroy();
                 this.parentNode.data.editor = new JSONEditor(container, {});
                 this.parentNode.data.editor.set(dataDocument.data.json);

                   this.parentNode.update({
                       dataSetDoc: dataDocument.data.json
                        });
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