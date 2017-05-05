Ext.application({
  name: 'Alphabet',
  appFolder: 'dist',
  requires: ['Alphabet.view.AlphabetContainer'],
  launch: function launch() {
    Ext.create('Alphabet.view.AlphabetContainer', {});
  }
});
//# sourceMappingURL=app.js.map