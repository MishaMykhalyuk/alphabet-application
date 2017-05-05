Ext.define('Alphabet.store.Alphabet', {
  config: {
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  },
  extend: 'Ext.data.Store',
  model: 'Alphabet.model.Letter',
  proxy: 'memory',

  constructor: function constructor(config) {
    this.initConfig(config);
    this.callParent();
    var letterRecors = this.buildLetterRecords();
    this.loadData(letterRecors);
  },
  buildLetterRecords: function buildLetterRecords() {
    return this.letters.split('').map(function (letter) {
      return { letter: letter };
    });
  }
});
//# sourceMappingURL=Alphabet.js.map