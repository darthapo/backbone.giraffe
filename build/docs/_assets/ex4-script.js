var app = new Giraffe.App();
app.attachTo('body');

app.once('disposing', function() {
  $('body').append('<p>app is disposing</p>');
});

app.once('disposed', function() {
  $('body').append('<p>app is disposed</p>');
});

var childModel = new Giraffe.Model();
app.addChild(childModel);

var childCollection = new Giraffe.Collection([{'name': 'a model!'}]);
app.addChild(childCollection);

var childView = new Giraffe.View();
app.attach(childView); // `addChild` would work too, but doesn't put childView.$el in app.$el

childModel.once('disposed', function() {
  $('body').append('<p>model is disposed</p>');
});

childCollection.once('disposed', function() {
  $('body').append('<p>collection is disposed</p>');
});

childCollection.models[0].once('disposed', function() {
 $('body').append('<p>collection\'s model is disposed</p>');
});

childView.once('disposed', function() {
  $('body').append('<p>view is disposed</p>');
});

app.dispose();