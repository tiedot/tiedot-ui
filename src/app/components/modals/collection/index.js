let Node = require('basis.ui').Node;
let Value = require('basis.data').Value;

module.exports = new Node.subclass({
    template: resource('./template.tmpl'),
    selected:true,
    action : {
        enterCollection(){
            console.log( 'enter collection' );
        },
        save(){
            console.log( 'save' );
        },
        cancel(){
            this.unselect();
        }
    }
});