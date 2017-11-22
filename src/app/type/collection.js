var entity = require('basis.entity');
let action = require('basis.net.action');
let Dataset = require('basis.data').Dataset;
let DataObject = require('basis.data').Object;
let ajax = basis.require('basis.net.ajax');

let collection = new Dataset({
  syncAction: action.create({
    url: 'http://localhost:8080/all',
    success(response) {
      this.set(response.map(data => new DataObject({ data : {title : data}})) )
    }
  }),
   remove(nameCol){
       ajax.request({
           url: `http://localhost:8080/drop?col=${nameCol.trim()}`,
           handler: {
               success: (transport, request, response) => {
                   this.deprecate();
               },
           }
       });
   }
});

module.exports = collection;
