let Node = require('basis.ui').Node;
let ajax = basis.require('basis.net.ajax');
let dataCollection = require('app.type.collection')

module.exports = new Node.subclass({
    template: resource('./template.tmpl'),
    disabled:false,
    selected:true,
    action : {
        save(){
            this.disable();
            let input = this.tmpl.input;
            ajax.request({
                url: `http://localhost:8080/create?col=${input.value.trim()}&page=0&total=1`,
                handler: {
                    success: (transport, request, response) => {
                        dataCollection.deprecate();
                        this.unselect();
                        input.value = '';
                        this.enable();
                    },
                }
            });
        },
        cancel(){
            this.unselect();
        }
    }
});