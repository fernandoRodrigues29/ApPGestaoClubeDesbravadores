// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})//criação de controller personalizado
//urlRouterProvider
.config(function($stateProvider,$urlRouterProvider){ 
  $stateProvider
  .state('db', {
    url: '/db',
    abstract:true,
    templateUrl: 'templates/teste.html',
    controller: 'deufulCtrl'
  })
  /**/
  .state('p', {
    url: '/p',
    templateUrl: 'templates/principal.html',
    controller: 'principalCtrl'
  }) 
  .state('desbravador1', {
      url: '/dbv',
      templateUrl: 'templates/desbravador.html',
      controller: 'dbvCtrl'
    })
  .state('dbvDt', {
    url: '/dbvDt/:ind',
    templateUrl: 'templates/detalheDesbravador.html',
    controller: "dbvIndividualCtrl"
  })     
  .state('und', {
      url: '/und',
      templateUrl: 'templates/unidade.html',
      controller: 'undCtrl'
  })
  .state('sec', {
      url: '/sec',
      templateUrl: 'templates/listaSecretaria.html',
      controller: 'secCtrl'
  })
  .state('secApont', {
      url: '/secApont/:ind',
      templateUrl: 'templates/formSecretaria.html',
      controller: 'secApontCtrl'
  })
  .state('almochrifado', {
    url: '/almocharifado',
    templateUrl: 'templates/almocharifado.html',
    controller: 'almocharifadoCtrl'
  })
  .state('pluges', {
    url: '/pluges',
    templateUrl: 'templates/plugues.html',
    controller: 'plugesCtrl'
  })  
  .state('grafico', {
    url: '/grafico',
    templateUrl: 'templates/grafico.html',
    controller: 'graficCtrl'
  });
  $urlRouterProvider.otherwise('/p');

})
