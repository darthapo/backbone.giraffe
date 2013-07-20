Contrib = Giraffe.Contrib = {}

###
*
* @example
*
*  var FruitsView = Giraffe.Contrib.CollectionView.extend({
*    itemView: FruitView,
*  });
*
*  var view = new FruitsView({collection: []});
###

class Contrib.CollectionView extends Giraffe.View
  constructor: (options) ->
    @listenTo options.collection, 'add', @_onAdd
    @listenTo options.collection, 'remove', @_onRemove
    @listenTo options.collection, 'reset', @_onReset
    @listenTo options.collection, 'sort', @_onSort
    @ItemView = @itemView
    super

#ifdef DEBUG
    # throw new Error('`itemView` is required') unless @ItemView
    # throw new Error('`collection` is required') unless @collection
    # throw new Error('`collection.model` is required') unless @collection.model
#endif

  _onAdd: (item) ->
    options = @_calcAttachOptions(item)
    itemView = new @ItemView(model: item)
    @attach itemView, options


  _onRemove: (item) ->
    itemView = _.findWhere(@children,  model: item)
    itemView?.dispose()


  _onReset: ->
    @removeChildren()
    @afterRender()


  _onSort: ->
    @removeChildren()
    @afterRender()


  _calcAttachOptions: (item) ->
    options =
      method: 'prepend'
    index = @collection.indexOf(item)
    if index > 0
      options.method = 'after'
      pred = this.collection.at(index - 1)
      predView = _.findWhere(@children, model: pred)
      options.el = predView
    options


  afterRender: ->
    my = @
    @collection.each (item) ->
      my._onAdd item

