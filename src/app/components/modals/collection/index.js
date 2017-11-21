let Node = require('basis.ui').Node;
let Value = require('basis.data').Value;
let ValueDisplay = new Value(true);
ValueDisplay.set(true);

module.exports = new Node.subclass({
    template: resource('./template.tmpl'),
    selected:ValueDisplay,
    action : {
        enterCollection(){
            console.log( 'enter collection' );
        },
        save(){
            console.log( 'save' );
        },
        cancel(){
            ValueDisplay.set(false)
        }
    }
});