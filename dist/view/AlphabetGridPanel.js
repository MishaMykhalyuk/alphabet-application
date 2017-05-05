function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ALPHABET_STORE_KEYPATH = 'Alphabet.store.Alphabet';
var ALPHABET_MODEL_KEYPATH = 'Alphabet.model.Letter';

Ext.define('Alphabet.view.AlphabetGridPanel', {
  extend: 'Ext.grid.Panel',
  requires: [ALPHABET_STORE_KEYPATH],
  lettersStore: Ext.create(ALPHABET_STORE_KEYPATH, {
    letters: ''
  }),
  store: {
    model: ALPHABET_MODEL_KEYPATH,
    sorters: [{ property: 'letter' }],
    proxy: 'memory'
  },
  columns: [{
    text: 'English letter',
    dataIndex: 'letter',
    flex: 1
  }],
  selType: 'checkboxmodel',

  initComponent: function initComponent() {
    this.callParent();
    this.subscribeToStoreChanges();
    this.initToolbar();
  },
  subscribeToStoreChanges: function subscribeToStoreChanges() {
    this.store.on({
      add: this.addRecord.bind(this),
      remove: this.removeRecord.bind(this)
    });
  },
  addRecord: function addRecord(store, records) {
    var _this = this;

    records.forEach(function (record) {
      var letter = record.get('letter');
      var letterToRemove = _this.lettersStore.find('letter', letter);
      _this.lettersStore.removeAt(letterToRemove);
    });
  },
  removeRecord: function removeRecord(store, record) {
    this.lettersStore.add(record);
  },
  initToolbar: function initToolbar() {
    var _this2 = this;

    var addLetterWidget = this.createAddLetterWidget();

    this.addDocked({
      xtype: 'toolbar',
      dock: 'bottom',
      items: [{
        itemId: 'add',
        text: 'Add',
        // disabled: true,
        handler: function handler() {
          addLetterWidget.show(_this2, function () {});
        }
      }, {
        text: 'Delete',
        handler: function handler() {
          _this2.removeSelectedLetters();
          _this2.updateActivation();
        },
        scope: this
      }]
    });
  },
  createAddLetterWidget: function createAddLetterWidget() {
    var selectLetterComboBox = this.createComboBoxComponent();
    var addLetterButton = this.createButtonComponent(selectLetterComboBox);

    return Ext.create('widget.window', {
      title: 'Add letter',
      header: {
        titlePosition: 2,
        titleAlign: 'center'
      },
      closable: true,
      closeAction: 'hide',
      width: 300,
      height: 200,
      items: [selectLetterComboBox, addLetterButton]
    });
  },
  createComboBoxComponent: function createComboBoxComponent() {
    return Ext.create('Ext.form.field.ComboBox', _defineProperty({
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
      width: 40
    }, 'width', 200));
  },
  createButtonComponent: function createButtonComponent(selectLetterComboBox) {
    var _this3 = this;

    return Ext.create('Ext.Button', {
      text: 'Add',
      handler: function handler() {
        var selectedValue = selectLetterComboBox.getValue();

        if (_this3.isValidValue(selectedValue)) {
          _this3.store.addSorted(Ext.create(ALPHABET_MODEL_KEYPATH, { letter: selectedValue }));
        } else {
          Ext.Msg.alert('Validation failed', 'Please, enter correct letter.');
        }

        selectLetterComboBox.clearValue();
      }
    });
  },
  isValidValue: function isValidValue(letter) {
    return this.lettersStore.find('letter', letter) >= 0;
  },
  removeSelectedLetters: function removeSelectedLetters() {
    var selectedLetters = this.getSelectedLetters();

    if (this.isItemsToRemove(selectedLetters)) {
      Ext.Msg.confirm('Delete letter(s)', 'Do you really want to delete ' + selectedLetters.length + ' selected letter(s)?', this.removeLetters(selectedLetters));
    }
  },
  getSelectedLetters: function getSelectedLetters() {
    return this.view.getSelectionModel().getSelection();
  },
  isItemsToRemove: function isItemsToRemove(selectedLetters) {
    return selectedLetters.length > 0;
  },
  removeLetters: function removeLetters(selectedLetters) {
    var _this4 = this;

    return function (isConfirm) {
      if (isConfirm === 'yes') {
        _this4.store.remove(selectedLetters);
      }
    };
  },
  forceRemoveSelectedLetters: function forceRemoveSelectedLetters() {
    var selectedLetters = this.getSelectedLetters();
    this.store.suspendEvent('remove');
    this.store.remove(selectedLetters);
    this.store.resumeEvent('remove');
  },
  updateActivation: function updateActivation() {
    this.queryById('add').setDisabled(false);
  },
  dropItems: function dropItems(records) {
    records.forEach(function (record) {
      return record.remove();
    });
  },
  setData: function setData(records) {
    this.store.loadData(records);
  }
});
//# sourceMappingURL=AlphabetGridPanel.js.map