let entity = require('basis.entity');
let action = require('basis.net.action');
let DataObject = require('basis.data').Object;
let ajax = basis.require('basis.net.ajax');
let STATE = require('basis.data').STATE;

let document = new DataObject({
    get(collectName){
        this.setState(STATE.PROCESSING);
        return new Promise((resolve, reject) => {
            ajax.request({
                url: 'http://localhost:8080/getpage?col=' + collectName+ '&page=0&total=1',
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
    }
});
module.exports = document;