(function(root) {

  var PT = root.PT = (root.PT || {});

  var Photo = PT.Photo = function(attrs) {
    this.attributes = attrs;
  };

  _.extend(Photo.prototype, {
    set: function(attr_name, val) {
      this.attributes[attr_name] = val;
    },
    get: function(attr_name) {
      return this.attributes[attr_name];
    },
    create: function(callback) {
      if (this.id) {
        return;
      } else {
        var that = this;
        $.ajax({
          url: 'api/photos',
          method: 'POST',
          data: { photo: this.attributes },
          success: function (response) {
            _.extend(that.attributes, response)
            Photo.all.unshift(that);
            Photo.trigger('add');
            callback();
          }
        });
      }
    },
    save: function (callback) {
      if (this.id) {
        $.ajax({
          url: 'api/photos/:id',
          method: 'PUT',
          data: { photo: this.attributes },
          success: function (response) {
            _.extend(that.attributes, response)
            callback();
          }
        });
      } else {
        this.create(callback);
      }
    }
  });

  _.extend(Photo, {
    all: [],
    fetchByUserId: function(userId, callback) {
      $.ajax({
        url: 'api/users/' + userId + '/photos',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
          PT.Photo.all = [];
          _.each(response, function(photoData) {
            var photo = new PT.Photo(photoData);
            PT.Photo.all.push(photo);
          });
          callback(PT.Photo.all);
        }
      });
    },
    _events: {},
    on: function (eventName, callback) {
      this._events[eventName] = ( this._events[eventName] || [] );
      this._events[eventName].push(callback);
    },
    trigger: function (eventName) {
      for (var i = 0; i < this._events[eventName].length; i++) {
        this._events[eventName][i]();
      }
    },
    find: function (id) {
      for (var i = 0; i < Photo.all.length; i++) {
        if (Photo.all[i].attributes.id === id) {
          return Photo.all[i];
        }
      }
      return null;
    }
  });

})(this);