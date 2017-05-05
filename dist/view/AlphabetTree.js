Ext.define('Alphabet.view.AlphabetTree', {
  extend: 'Ext.tree.Panel',
  store: {
    model: 'Alphabet.model.Letter',
    sorters: [{ property: 'letter' }],
    root: {
      letter: 'English Alphabet',
      expanded: true,
      leaf: false
    },
    proxy: 'memory'
  },
  displayField: 'letter',

  setData: function setData(records) {
    var rootNode = this.getStoreRoot();

    rootNode.appendChild(records);
  },
  getStoreRoot: function getStoreRoot() {
    return this.store.getRootNode();
  }
});
//# sourceMappingURL=AlphabetTree.js.map