let Node = require('basis.ui').Node;
let router = require('basis.router');
let dataCollection = require('app.type.collection');
let Value = require('basis.data').Value;
let STATE = require('basis.data').STATE;
let ajax = basis.require('basis.net.ajax');
let ItemCollection = require('./item');
let settings = require('../../../settings/server-config.json');
let modalCreateCollection = require('app.components.modals.collection.index');
let dataDocument = require('app.type.document');

module.exports = new Node({
    active: true,
    template: resource('./template.tmpl'),
    childClass: ItemCollection,
    sortingDesc: false,
    sorting: function(child){
        return child.data.title;
    },
    dataSource: dataCollection,
    data : {
        dataSetDoc:null, // source json
        editor:null,
        json : 'json-content',
    },
    satellite : {
        modalCreateCol : modalCreateCollection,
    },
    binding: {
        modalCreateCol : 'satellite:',
        json : 'data:',
        documentReady:Value.query('data.dataSetDoc').as( doc =>  doc === null ? false : true ),
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
            if (!Object.keys(this.data.dataSetDoc).length) {
                console.log( 'save new' );
                dataDocument.create(selectedColName, this.data.editor.get())
            }
            this.update({
                dataSetDoc : null
            });

            // this.data.editor.destroy();
        },
        destroyEditor(){
            dataDocument.setState(STATE.UNDEFINED);
            this.update({
                dataSetDoc : null
            });
            this.data.editor.destroy();
        }
    },
});

