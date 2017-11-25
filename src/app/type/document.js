let entity = require('basis.entity');
let action = require('basis.net.action');
let DataObject = require('basis.data').Object;
let ajax = basis.require('basis.net.ajax');
let STATE = require('basis.data').STATE;
let settings = require('../settings/server-config.json');

let document = new DataObject({
    get(collectName){
        this.setState(STATE.PROCESSING);
        return new Promise((resolve, reject) => {
            ajax.request({
                url: `${settings.host}/getpage?col=${collectName}&page=0&total=1`,
                handler: {
                    success: (transport, request, response) => {
                        this.setState(STATE.READY);
                        this.update({
                            json : response
                        });
                        resolve()
                    },
                }
            });
        });
    },
    create(collectName, json){
        this.setState(STATE.PROCESSING);
        ajax.request({
            url: `${settings.host}/insert?col=${collectName}`,
            params: {
                doc: JSON.stringify(json)
            },
            handler: {
                success: (transport, request, response) => {
                    this.setState(STATE.READY);
                }
            }
        });
    }
});
module.exports = document;