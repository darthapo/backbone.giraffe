var Fruit = Giraffe.Model.extend({
  defaults: {
    name: null,
    color: null
  }
});

var Fruits = Giraffe.Collection.extend({
  model: Fruit,
  comparator: 'name'
});

var FruitView = Giraffe.View.extend({
  template: '#fruit-template',

  initialize: function() {
    this.$el.css('background-color', this.model.get('color'));
  },

  serialize: function() {
    return this.model.toJSON()
  },

  onDelete: function() {
    // Giraffe method which also removes it from the collection
    this.model.dispose();
  },

  onClone: function() {
    this.model.collection.add(this.model.clone());
  }
});

var FruitsView = Giraffe.Contrib.CollectionView.extend({
  itemView: FruitView
});

var savoryFruits = [
    {name: 'Apple', color: '#0F0'},
    {name: 'Banana', color: '#FF0'},
    {name: 'Orange', color: '#FF7F00'},
    {name: 'Pink Grapefruit', color: '#C5363A'}
];

var fruits = new Fruits(savoryFruits);

var fruitsView = new FruitsView({
  collection: fruits
});

var MainView = Giraffe.View.extend({
  template: '#main-template',

  onClickReset: function() {
    fruitsView.collection.reset(savoryFruits);
  },

  afterRender: function() {
    this.attach(fruitsView, {method: 'append'});
  }
});

var mainView = new MainView();

mainView.attachTo('body');