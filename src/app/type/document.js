let entity = require('basis.entity');
let action = require('basis.net.action');
let Dataset = require('basis.data').Dataset;
let DataObject = require('basis.data').Object;
let ajax = basis.require('basis.net.ajax');
let STATE = require('basis.data').STATE;

let document = new DataObject({
    get(collectName){
        this.setState(STATE.PROCESSING);
        ajax.request({
            url: 'http://localhost:8080/getpage?col=' + collectName+ '&page=0&total=1',
            handler: {
                success: (transport, request, response) => {
                    this.setState(STATE.READY);
                    this.update({
                        json : response
                    })
                },
            }
        });
    }
});
module.exports = document;