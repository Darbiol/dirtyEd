directory.CreateAccountView = Backbone.View.extend({

  events: {
    "click body"              : "testAlert",
    "submit #createAccount"   : "submit"
  },

  initialize: function() {

    if(this.collection) {

      this.collection.basic.on('add', this.showAdded, this);
      this.collection.basic.on('change', this.showChanges, this);

      this.collection.custom.on('add', this.showAdded, this);
      this.collection.custom.on('change', this.showChanges, this);

      this.basicListView    = new directory.FormFieldListView({ collection: this.collection.basic, className: 'basic' });
      this.customListView   = new directory.FormFieldListView({ collection: this.collection.custom, className: 'custom' });

    }
    
  },

  render: function() {
    this.$el.html(this.template());

    if(this.collection) {
      // console.log(this.basicListView.render().el);
      // this.basicListView.render().el;
      $('.table-basic', this.el).append(this.basicListView.render().el);
      $('.table-custom', this.el).append(this.customListView.render().el);
    }

    return this;
  },

  showAdded: function() {
    alert('showAdded');
  },

  showChanges: function() {
    alert('showChanges');
  },

  testAlert: function() {
    alert('TEST!');
  },

  submit: function(e) {
    e.preventDefault();

    this.getFormData($("#createAccount"));
  },

  getFormData: function(form) {
    var FormData = this.mapArray( form.serializeArray() );
    console.log(FormData);
  },

  mapArray: function(arr) {
    var obj = {};

    $.map(arr, function(value, index) {
        obj[value['name'].replace('field_', '')] = value['value'];
    });
    return obj;
  }

});

directory.FormFieldListView = Backbone.View.extend({

  tagName: 'tbody',

  render: function() {
    this.$el.empty();

    _.each(this.collection.attributes, function (docs) {
      this.$el.append(new directory.FormFieldListItemView({ model: docs }).render().el);
    }, this);
    return this;
  }

});

directory.FormFieldListItemView = Backbone.View.extend({

  tagName: 'tr',

  render: function() {
    var data        = this.model;
    data.fieldName  = 'field_'+ data._id;
    // console.log(data);
    this.$el.html(this.template(data));
    return this;
  }

});

















