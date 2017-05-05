Ext.define('Alphabet.view.AlphabetContainer', {
  extend: 'Ext.container.Viewport',
  requires: ['Alphabet.view.AlphabetTree', 'Alphabet.view.AlphabetGridPanel', 'Alphabet.store.Alphabet'],
  treeLettersCount: 10,
  layout: 'border',

  initComponent: function initComponent() {
    var grid = Ext.create('Alphabet.view.AlphabetGridPanel', {
      region: 'center',
      viewConfig: {
        plugins: {
          ptype: 'gridviewdragdrop',
          dragGroup: 'grid-items-zone',
          dropGroup: 'tree-items-zone',
          dragText: 'Move letter to the tree'
        },
        listeners: {
          drop: function drop(element, _ref) {
            var records = _ref.records;

            this.store.sort();
            grid.dropItems(records);
          }
        }
      }
    });

    var tree = Ext.create('Alphabet.view.AlphabetTree', {
      region: 'west',
      width: '35%',
      viewConfig: {
        plugins: {
          ptype: 'treeviewdragdrop',
          dragGroup: 'tree-items-zone',
          dropGroup: 'grid-items-zone',
          dragText: 'Move letter to the grid',
          sortOnDrop: true
        },
        listeners: {
          drop: function drop() {
            grid.forceRemoveSelectedLetters();
          }
        }
      }
    });
    var records = Ext.create('Alphabet.store.Alphabet').getRange();

    this.items = [tree, grid];
    this.callParent();

    tree.setData(records.slice(0, this.treeLettersCount));
    grid.setData(records.slice(this.treeLettersCount));
  }
});
//# sourceMappingURL=AlphabetContainer.js.map