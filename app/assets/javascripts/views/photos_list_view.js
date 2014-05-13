(function(root) {

  var PT = root.PT = (root.PT || {});

  var PhotosListView = PT.PhotosListView = function() {
    this.$el = $('<div>');
    PT.Photo.on('add', this.render.bind(this));
    this.$el.on("click", 'ul', this.showDetail.bind(this))
  };

  _.extend(PhotosListView.prototype, {
    render: function() {
      var photos = PT.Photo.all;
      this.$el.empty();

      var $list = $('<ul>')
      _.each(photos, function(photo) {
        var link = '<a href="#" data-id="' + photo.attributes.id + '">';
        $list.append('<li>' + link + photo.attributes.title + '</a></li>');
      })
      this.$el.append($list);
      return this.$el;
    },
    showDetail: function(event) {
      event.preventDefault();
      var photo_id = parseInt(event.target.dataset['id']);
      var photo = PT.Photo.find(photo_id);
      PT.showPhotoDetail(photo);
    }
  });


})(this);