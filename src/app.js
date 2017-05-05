Ext.application({
  name: 'Alphabet',
  appFolder: 'dist',
  requires: ['Alphabet.view.AlphabetContainer'],
  launch() {
    Ext.create('Alphabet.view.AlphabetContainer', {})
  },
});
