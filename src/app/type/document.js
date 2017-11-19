var entity = require('basis.entity');
let action = require('basis.net.action');
let Dataset = require('basis.data').Dataset;
let DataObject = require('basis.data').Object;


let document = new Dataset({
    // настриваем синхронизацию
    syncAction: action.create({
        url: 'http://localhost:8080/col=Friends&page=0&total=1',
        success(response) {
            // после завершения загрузки данных, необходимо превратить полученные JS-объекты в DataObject и поместить их в набор
            // this.set(wrap(response, true));
            this.set(response.map(data => new DataObject({ data : {title : data}})) )
        }
    }),
});
module.exports = document;