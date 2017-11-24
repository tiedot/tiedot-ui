let Node = require('basis.ui').Node;
let router = require('basis.router');
let dataCollection = require('app.type.collection');
let Value = require('basis.data').Value;
let STATE = require('basis.data').STATE;
let ajax = basis.require('basis.net.ajax');
let ItemCollection = require('./item');
let settings = require('../../../settings/server-config.json');
let modalCreateCollection = require('app.components.modals.collection.index');

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
        dataSetDoc:null,
        editor:null,
        json : 'json-content',
        loadingDoc:false,
        contentCollection:true,
    },
    satellite : {
        modalCreateCol : modalCreateCollection,
    },
    binding: {
        modalCreateCol : 'satellite:',
        json : 'data:',
        loadingDoc:'data:',
        loading:Value.query('childNodesState').as(state => state == STATE.PROCESSING),
        contentCollection:'data:',
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
                ajax.request({
                    url: `${settings.host}/insert?col=${selectedColName}`,
                    params: {
                        doc: JSON.stringify(this.data.editor.get())
                    },
                    handler: {
                        success: function(transport, request, response){
                            console.log('response data:', response);
                        }
                    }
                });
            }
        },
        destroyEditor(){
            this.data.editor.destroy()
        }
    },
});

