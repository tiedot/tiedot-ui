let Value = require('basis.data').Value;

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
        return !Object.keys(this.lastJson.value).length
    },
    isDelete: function () {
        return Object.keys(this.lastJson.value).filter((value) => {
           return Object.keys(this.editor.get()).indexOf(value) === -1
        });

    }
};

module.exports = Editor;