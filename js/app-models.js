App = Ember.Application.create({
	LOG_TRANSITIONS : true
});

//-> **** Ember DATA Adapters **** <-//
//App.ApplicationAdapter = DS.RESTAdapter.extend(); //To communicate with an HTTP server using JSON
App.ApplicationAdapter = DS.FixtureAdapter.extend(); //-> Store on memory (load records from memory)


/* -> Doesn't work with models
App.PRODUCTS = [
  {title : 'Iphone', price : 200, description : 'Super bueno', isOnSale : true, image : 'img/iphone5s.jpg'},
  {title : 'Samsung galaxy s4', price : 300, description : 'Marca dell', isOnSale : false, image : 'img/galaxys5.jpg'}
];*/

App.Router.map(function() {
  // put your routes here
  this.route('about');
  this.resource('products', function(){
    this.resource('product', {path: '/:id'});//Ember Data (by default) must use a unique identifier. We’ll use :product_id
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
    //return App.PRODUCTS;
    return this.store.findAll('product');//In order to get our fixture data out of the store (Finds all products from the fixture adapter)
  }
});

/* ***** !We can delete the ProductRoute and use the default!  </ -> Important */ 
App.ProductRoute = Ember.Route.extend({
	model: function(params){
		//return App.PRODUCTS.findBy('title', params.title);
		//console.log(params);
    return this.store.find('product', params.product_id); 
	}
});

//-> **** Creating our "products" model (string, number, boolean, date) **** <-//
App.Product = DS.Model.extend({
  title : DS.attr('string'),
  price : DS.attr('number'),
  description : DS.attr('string'),
  isOnSale : DS.attr('boolean'),
  image : DS.attr('string')
});
//-> Provide ember model Data fixture (MUST BE AFTER THE MODEL DECLARATION!!)
//-> For models each model element (fixture) must have an unique id
App.Product.FIXTURES = [
  {
    id: 1,
    title: 'Flint',
    price: 99,
    description: 'Flint is a hard, sedimentary cryptocrystalline form of the mineral quartz, categorized as a variety of chert.',
    isOnSale: true,
    image: 'img/iphone5s.jpg'
  },
  {
    id : 2,
    title: 'Kindling',
    price: 249,
    description: 'Easily combustible small sticks or twigs used for starting a fire.',
    isOnSale: false,
    image: 'img/galaxys5.jpg'
  }
];

