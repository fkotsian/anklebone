(function (root){
  var PT = root.PT = (root.PT || {});
  var PhotoDetailView = PT.PhotoDetailView = function (photo) {
    this.photo = photo;
    this.$el = $('<div>');
    this.template = JST['photo_detail'];
    this.$el.on('click', 'button', function () {
      PT.showPhotosIndex();
    })
  }

  PhotoDetailView.prototype.render = function () {
    var renderedTemplate = this.template({
      photo: this.photo
    });
    this.$el.html(renderedTemplate);
    return this.$el;
  }
})(this);