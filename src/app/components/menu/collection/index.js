let Node = require('basis.ui').Node;
let router = require('basis.router');
let dataCollection = require('app.type').Collection;
let Value = require('basis.data').Value;
let STATE = require('basis.data').STATE;
let ajax = basis.require('basis.net.ajax');
let ItemCollection = require('./item');
let settings = require('../../../settings/server-config.json');
let modalCreateCollection = require('app.components.modals.collection.index');
let dataDocument = require('app.type.document');
let jseditor = require('app.utils.jseditor');
let preloader = require('app.components.preloader.index');

module.exports = new Node({
    active: true,
    template: resource('./template.tmpl'),
    childClass: ItemCollection,
    sortingDesc: false,
    sorting: function(child){
        return child.data.title;
    },
    dataSource: dataCollection,
    satellite : {
        preLoader:preloader,
        modalCreateCol : modalCreateCollection,
    },
    binding: {
        preLoader:'satellite:',
        modalCreateCol : 'satellite:',
        documentReady:jseditor.lastJson.as( doc =>  doc == null ? false : true),
        loadingDoc: Value.state(dataDocument).as(state => state == STATE.PROCESSING),
        loading: Value.query('childNodesState').as(state => state == STATE.PROCESSING),
    },
    action : {
        createCollection(){
            this.satellite.modalCreateCol.urlFn = function (inputValue) {
             return `${settings.host}/create?col=${inputValue}`
             };
            this.satellite.modalCreateCol.select();
        },
        saveEditor(){
            let selectedColName = this.childNodes.find(function(child){
                if(child.selected) {
                    return true;
                }
            }).data.title;

            // to determine the mode of
            // create
            let newItems = jseditor.isNewDocument();
            if (Object.keys(newItems).length > 0) {
                dataDocument.create(selectedColName, newItems);
                return defer();
            }

            // delete
            let deletedItems = jseditor.isDelete();
            if (deletedItems.length > 0) {
                dataDocument.delete(selectedColName, deletedItems).then(() => {
                    dataDocument.setState(STATE.READY);
                });
                return defer();
            }

            // update
            let updatedItems = jseditor.isUpdate();
            if (Object.keys(updatedItems).length > 0) {
                dataDocument.updateDoc(selectedColName, updatedItems).then(() => {
                    dataDocument.setState(STATE.READY);
                });
                return defer();
            }

            function defer() {
                // after operations, update doc
                dataDocument.get(selectedColName).then(() => {
                    jseditor.render('.json_area', dataDocument.data.json, true);
                });
            }
        },
        destroyEditor(){
            dataDocument.setState(STATE.UNDEFINED);
            jseditor.destroy()
        }
    },
});

