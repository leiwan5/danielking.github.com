(function() {
  var APP_NAME, APP_TITLE;

  APP_NAME = 'com_jedisto_jedios_bookmarks';

  APP_TITLE = 'Bookmarks';

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
      message.subscribe('app');
      $rootScope.$on('message', function(evt, message, data) {});
      return message.publish('app:started', {
        app_name: APP_NAME,
        event: 'started'
      });
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/