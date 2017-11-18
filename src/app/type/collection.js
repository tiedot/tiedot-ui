var entity = require('basis.entity');
let action = require('basis.net.action');
let Dataset = require('basis.data').Dataset;
let DataObject = require('basis.data').Object;

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
      // после завершения загрузки данных, необходимо превратить полученные JS-объекты в DataObject и поместить их в набор
  // this.set(wrap(response, true));
      this.set(response.map(data => new DataObject({ data : {title : data}})) )
    }
  })
});
module.exports = collection;
