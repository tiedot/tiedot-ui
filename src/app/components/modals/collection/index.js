let Node = require('basis.ui').Node;
let ajax = basis.require('basis.net.ajax');

module.exports = new Node.subclass({
    template: resource('./template.tmpl'),
    selected:false,
    action : {
        save(){
            ajax.request({
                url: `http://localhost:8080/create?col=${this.tmpl.input.value.trim()}&page=0&total=1`,
                handler: {
                    success: (transport, request, response) => {
                       console.log( response );
                    },
                }
            });
        },
        cancel(){
            this.unselect();
        }
    }
});