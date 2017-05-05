Ext.define('Alphabet.view.AlphabetTree', {
  extend: 'Ext.tree.Panel',
  store: {
    model: 'Alphabet.model.Letter',
    sorters: [{ property: 'letter' }],
    root: {
      letter: 'English Alphabet',
      expanded: true,
      leaf: false,
    },
    proxy: 'memory',
  },
  displayField: 'letter',

  setData(records) {
    const rootNode = this.getStoreRoot();

    rootNode.appendChild(records);
  },

  getStoreRoot() {
    return this.store.getRootNode();
  },
});
