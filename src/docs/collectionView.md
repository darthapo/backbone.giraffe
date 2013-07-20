# Giraffe.Contrib.CollectionView

This example details how to implement a collection of items by rendering a
collection of savory colored fruits.

:::BEGIN Example

## Collection and Model

To start, define the model and collection representing the fruits, which is
the same as in __Backbone__. The advantage of using __Giraffe.Model__ is it adds a few helper methods
such as `Model#dispose`.

```js
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
```

## Item View

Each fruit is rendered by a `FruitView`.

```js
var FruitView = Giraffe.View.extend({
  template: '#fruit-template',

  initialize: function() {
    this.$el.css('background-color', this.model.get('color'));
  },

  serialize: function() {
    return this.model.toJSON()
  },
```

We could cheat and call `this.dispose()` here. By modifying the collection
instead, any view observing the collection is notified. `Contrib.CollectionView`
observes collection changes and modifies its item views accordingly.

```js
  onDelete: function() {
    // Giraffe method which also removes it from the collection
    this.model.dispose();
  },

  onClone: function() {
    this.model.collection.add(this.model.clone());
  }
});
```

Add a delete and clone button to allow users to manually modify the collection.

```html
<script id='fruit-template' type='text/template'>
  <div class='fruit-view'>
    <h2><%= name %></h2>
    <button data-gf-click='onDelete'>delete</button>
    <button data-gf-click='onClone'>clone</button>
  </div>
</script>
```

## Collection View

Let's use `CollectionView` goody from `Giraffe.Contrib`.

```js
var FruitsView = Giraffe.Contrib.CollectionView.extend({
  itemView: FruitView
});
```

Let's create some tasty fruits and create an instance of `Fruits` collection
and assign it to an instance of `FruitsView`.

```js
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
```

Let's also give the user the ability to `reset` fruits at
any time. This button needs to be outside of the collection view otherwise
the button would get diposed when the collection view resets its children.

To keep things tidy, let's create a main view to contain the button and
collection view.

```html
<script id='main-template' type='text/template'>
  <button data-gf-click='onClickReset'>reset</button>
  <!-- fruits view is appended here in afterRender -->
</script>
```

```js
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
```

:::@ --hide

```css
h2 {
  font-size: 24px;
}
.fruit-view {
  position: relative;
  padding: 10px;
  margin: 10px;
}
```

{{{COMMON}}}

We need to source the  `Backbone.Giraffe.Contrib` library which defines `Giraffe.CollectionView`.

<div class='note'>
None-core goodies are added to `Backbone.Giraffe.Contrib`, short for contributions.
</div>

```html
  <script src="../backbone.giraffe.contrib.js" type="text/javascript"></script>
```

Voila! Tutty-fruity

{{{EXAMPLE style='height: 340px'}}}

:::END
