Ext.define('Alphabet.store.Alphabet', {
  config: {
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  extend: 'Ext.data.Store',
  model: 'Alphabet.model.Letter',
  proxy: 'memory',

  constructor(config) {
    this.initConfig(config);
    this.callParent();
    const letterRecors = this.buildLetterRecords();
    this.loadData(letterRecors);
  },

  buildLetterRecords() {
    return this.letters
      .split('')
      .map(letter => ({ letter }));
  },
});
