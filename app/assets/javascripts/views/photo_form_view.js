(function (root) {
  var PT = root.PT = (root.PT || {});
  var PhotoFormView = PT.PhotoFormView = function () {
    this.$el = $('<div>');
    this.template = JST["photo_form"];
    this.$el.submit('#photo_form', this.submit.bind(this));
  }

  _.extend(PhotoFormView.prototype, {
    render: function () {
      var renderedTemplate = this.template();
      this.$el.html(renderedTemplate)
      return this.$el;
    },

    submit: function(event) {
      event.preventDefault();
      var $form = $(event.target);
      var photoData = $form.serializeJSON();
      var newPhoto = new PT.Photo(photoData['photo']);
      $form.find('input').val('');
      newPhoto.create(function(){});
    }
  })

})(this);