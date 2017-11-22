var entity = require('basis.entity');
let action = require('basis.net.action');
let Dataset = require('basis.data').Dataset;
let DataObject = require('basis.data').Object;
let ajax = basis.require('basis.net.ajax');

//
// main part
//

// let Collection = entity.createType('Collection', {
//     title: String
// });


// Collection.extendClass({
//   syncAction: service.createAction({
//     url: 'http://localhost:8080/all',
//     success: function(data){
//       this.update(Collection.reader(data));
//     }
//   })
// });

// Collection.all.setSyncAction(service.createAction({
//     url: 'http://localhost:8080/all', // TODO until just hardcode
//     success: function(data){
//         this.sync(basis.array(data).map(TypeName.reader));
//     }
// }));

let collection = new Dataset({
  // настриваем синхронизацию
  syncAction: action.create({
    url: 'http://localhost:8080/all',
    success(response) {
      this.set(response.map(data => new DataObject({ data : {title : data}})) )
    }
  }),
   remove(nameCol) {
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
