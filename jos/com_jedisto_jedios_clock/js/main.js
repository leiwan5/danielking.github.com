(function() {
  var APP_NAME, APP_TITLE;

  APP_NAME = 'com_jedisto_jedios_clock';

  APP_TITLE = 'Clock';

  angular.module(APP_NAME, ['common']);

  angular.module(APP_NAME).run(['common.message', function(message) {}]);

  $(document).trigger('app_reg', {
    name: APP_NAME,
    title: APP_TITLE,
    genre: 'angular'
  });

  angular.module(APP_NAME).controller('AppController', [
    '$scope', 'common.message', function($scope, message) {
      $scope.app_name = APP_NAME;
      return message.publish('app', 'hello');
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/