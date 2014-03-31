App = Ember.Application.create({
	LOG_TRANSITIONS : true
});
App.PRODUCTS = [
  {title : 'Iphone', price : 200, description : 'Super bueno', isOnSale : true, image : 'img/iphone5s.jpg'},
  {title : 'Samsung galaxy s4', price : 300, description : 'Marca dell', isOnSale : false, image : 'img/galaxys5.jpg'}
];

App.Router.map(function() {
  // put your routes here
  this.route('about');
  this.resource('products', function(){
    this.resource('product', {path: '/:title'});
  });
  //this.resource('product', {path: '/products/:title'});
});

/*App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});*/

App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'http://todaymade.com/blog/wp-content/uploads/2013/03/emberjs-logo.png',
  time: function() {
    return (new Date()).toDateString();
  }.property()
});


/*App.ProductsRoute = Ember.Route.extend({
	model: function(){
		reeturn [
			{name:"Gustavo"},
			{name:"Pancho"}
		];
	}
});*/
App.ProductsRoute = Ember.Route.extend({
  model: function(){
    return App.PRODUCTS;
  }
});

App.ProductRoute = Ember.Route.extend({
	model: function(params){
		return App.PRODUCTS.findBy('title', params.title);
		//console.log(params);
	}
});

App.Product = DS.Model.extend({
  attr: DS.attr('string')
});

