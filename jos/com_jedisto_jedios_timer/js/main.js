(function() {
  var APP_NAME, APP_TITLE;

  APP_NAME = 'com_jedisto_jedios_timer';

  APP_TITLE = 'Timer';

  angular.module(APP_NAME, ['common']);

  angular.module(APP_NAME).config(function() {});

  angular.module(APP_NAME).run(['$rootScope', function($rootScope) {}]);

  $(document).trigger('app_reg', {
    name: APP_NAME,
    title: APP_TITLE,
    genre: 'angular'
  });

  angular.module(APP_NAME).controller('AppController', [
    '$scope', 'common.message', function($scope, message) {
      return $scope.app_name = APP_NAME;
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/