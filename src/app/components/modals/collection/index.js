let Node = require('basis.ui').Node;
let ajax = basis.require('basis.net.ajax');
let dataCollection = require('app.type.collection')

module.exports = new Node.subclass({
    template: resource('./template.tmpl'),
    disabled:false,
    selected:false,
    urlFn:null,
    binding:{
        oldInput:'data:'
    },
    data:{
      oldInput:'',
    },
    action : {
        save(){
            this.disable();
            let input = this.tmpl.input;

            if (typeof this.urlFn === "function") {
                ajax.request({
                    url: this.urlFn(input.value.trim(), this.data.oldInput),
                    handler: {
                        success: (transport, request, response) => {
                            dataCollection.deprecate();
                            this.unselect();
                            input.value = '';
                            this.enable();
                        },
                    }
                });
            } else {
                console.error("Expected type function")
            }
        },
        cancel(){
            this.tmpl.input.value = '';
            this.unselect();
        }
    }
});