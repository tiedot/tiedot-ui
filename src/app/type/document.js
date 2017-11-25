let entity = require('basis.entity');
let action = require('basis.net.action');
let Dataset = require('basis.data').Dataset;
let DataObject = require('basis.data').Object;


let document = new Dataset({
    syncAction: action.create({
        url: 'http://localhost:8080/getpage?col=Friends&page=0&total=1',
        success(response) {
            this.set(response.map(data => new DataObject({ data : {json : data}})) )
        },
        prepare(collect){
            // this.set('collectName', collect);
            console.log( this );
        }
    }),
});
module.exports = document;