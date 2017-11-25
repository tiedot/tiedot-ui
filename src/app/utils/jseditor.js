let Value = require('basis.data').Value;

const NEW_COLLECTION = '';

let Editor = {
    // source object
    editor : null,
    // last json render
    lastJson : new Value(''),
    getJson: function () {
      return this.editor.get()
    },
    render : function(selector, json, destroy) {
            this.editor && destroy && this.editor.destroy();
            this.editor = new JSONEditor(document.querySelector(selector), {});
            this.editor.set(json);
            this.lastJson.set(json)
    },
    destroy : function() {
        this.editor.destroy();
        this.lastJson.reset();
    },
    isNewDocument : function () {
        console.log( this.lastJson.value,  Object.keys(this.lastJson.value).length);
        return !Object.keys(this.lastJson.value).length
    }
};

module.exports = Editor;