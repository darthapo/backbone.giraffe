var View = Giraffe.View.extend({
  templateStrategy: 'underscore-template',
  template: '<p>Using <%= name %> strategy</p>',
  serialize: function() {
    return {name: 'underscore-template'};
  }
});

var view = new View();
view.attachTo('body');