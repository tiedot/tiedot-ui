var entity = require('basis.entity');
var service = require('app.service');

//
// main part
//

let Collection = entity.createType('Collection', {
    title: String
});


Collection.extendClass({
  syncAction: service.createAction({
    url: 'http://localhost:8080/all',
    success: function(data){
      this.update(Collection.reader(data));
    }
  })
});

// Collection.all.setSyncAction(service.createAction({
//     url: 'http://localhost:8080/all', // TODO until just hardcode
//     success: function(data){
//         this.sync(basis.array(data).map(TypeName.reader));
//     }
// }));

module.exports = Collection;
