let deepEqual = require('./deepEqual').deepEqual;
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
        let newItem = {};
        Object.keys(this.editor.get()).map((key) => {
             if (Object.keys(this.lastJson.value).indexOf(key) === -1){
                 newItem[key] = this.getJson()[key];
             }
        });
        return newItem;
    },
    isDelete: function () {
        return Object.keys(this.lastJson.value).filter((value) => {
           return Object.keys(this.getJson()).indexOf(value) === -1
        });
    },
    isUpdate: function () {
        let updatedItems = {};
         Object.keys(this.lastJson.value).map((value) => {
            if (!deepEqual(this.lastJson.value[value], this.getJson()[value])) {
                updatedItems[value] = this.getJson()[value]
            }
        });
         return updatedItems;
    }
};

module.exports = Editor;