const ALPHABET_STORE_KEYPATH = 'Alphabet.store.Alphabet';
const ALPHABET_MODEL_KEYPATH = 'Alphabet.model.Letter';

Ext.define('Alphabet.view.AlphabetGridPanel', {
  extend: 'Ext.grid.Panel',
  requires: [ALPHABET_STORE_KEYPATH],
  lettersStore: Ext.create(ALPHABET_STORE_KEYPATH, {
    letters: '',
  }),
  store: {
    model: ALPHABET_MODEL_KEYPATH,
    sorters: [{ property: 'letter' }],
    proxy: 'memory',
  },
  columns: [
    {
      text: 'English letter',
      dataIndex: 'letter',
      flex: 1,
    },
  ],
  selType: 'checkboxmodel',

  initComponent() {
    this.callParent();
    this.subscribeToStoreChanges();
    this.initToolbar();
  },

  subscribeToStoreChanges() {
    this.store.on({
      add: this.addRecord.bind(this),
      remove: this.removeRecord.bind(this),
    });
  },

  addRecord(store, records) {
    records.forEach((record) => {
      const letter = record.get('letter');
      const letterToRemove = this.lettersStore.find('letter', letter);
      this.lettersStore.removeAt(letterToRemove);
    });
  },

  removeRecord(store, record) {
    this.lettersStore.add(record);
  },

  initToolbar() {
    const addLetterWidget = this.createAddLetterWidget();

    this.addDocked({
      xtype: 'toolbar',
      dock: 'bottom',
      items: [
        {
          itemId: 'add',
          text: 'Add',
          // disabled: true,
          handler: () => {
            addLetterWidget.show(this, () => {});
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.removeSelectedLetters();
            this.updateActivation();
          },
          scope: this,
        }],
    });
  },

  createAddLetterWidget() {
    const selectLetterComboBox = this.createComboBoxComponent();
    const addLetterButton = this.createButtonComponent(selectLetterComboBox);

    return Ext.create('widget.window', {
      title: 'Add letter',
      header: {
        titlePosition: 2,
        titleAlign: 'center',
      },
      closable: true,
      closeAction: 'hide',
      width: 300,
      height: 200,
      items: [selectLetterComboBox, addLetterButton],
    });
  },

  createComboBoxComponent() {
    return Ext.create('Ext.form.field.ComboBox', {
      itemId: 'input',
      store: this.lettersStore,
      displayField: 'letter',
      emptyText: 'Select letter',
      queryMode: 'local',
      vtype: 'alpha',
      allowBlank: false,
      maxLength: 1,
      validateOnBlur: false,
      editable: false,
      autoSelect: true,
      width: 40,
      width: 200,
    });
  },

  createButtonComponent(selectLetterComboBox) {
    return Ext.create('Ext.Button', {
      text: 'Add',
      handler: () => {
        const selectedValue = selectLetterComboBox.getValue();

        if (this.isValidValue(selectedValue)) {
          this.store.addSorted(Ext.create(ALPHABET_MODEL_KEYPATH, { letter: selectedValue }));
        } else {
          Ext.Msg.alert('Validation failed', 'Please, enter correct letter.');
        }

        selectLetterComboBox.clearValue();
      },
    });
  },

  isValidValue(letter) {
    return this.lettersStore.find('letter', letter) >= 0;
  },

  removeSelectedLetters() {
    const selectedLetters = this.getSelectedLetters();

    if (this.isItemsToRemove(selectedLetters)) {
      Ext.Msg.confirm(
          'Delete letter(s)',
          `Do you really want to delete ${selectedLetters.length} selected letter(s)?`,
          this.removeLetters(selectedLetters),
      );
    }
  },

  getSelectedLetters() {
    return this.view.getSelectionModel().getSelection();
  },

  isItemsToRemove(selectedLetters) {
    return selectedLetters.length > 0;
  },

  removeLetters(selectedLetters) {
    return (isConfirm) => {
      if (isConfirm === 'yes') {
        this.store.remove(selectedLetters);
      }
    };
  },

  forceRemoveSelectedLetters() {
    const selectedLetters = this.getSelectedLetters();
    this.store.suspendEvent('remove');
    this.store.remove(selectedLetters);
    this.store.resumeEvent('remove');
  },

  updateActivation() {
    this.queryById('add').setDisabled(false);
  },

  dropItems(records) {
    records.forEach(record => record.remove());
  },

  setData(records) {
    this.store.loadData(records);
  },
});
