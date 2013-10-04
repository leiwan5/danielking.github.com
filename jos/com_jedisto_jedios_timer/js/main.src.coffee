APP_NAME = 'com_jedisto_jedios_timer'
APP_TITLE = 'Timer'

angular.module APP_NAME, ['common']

angular.module(APP_NAME).config () ->

angular.module(APP_NAME).run ['$rootScope', ($rootScope) ->
]

$(document).trigger 'app_reg', name: APP_NAME, title: APP_TITLE, genre: 'angular'

angular.module(APP_NAME).controller 'AppController', ['$scope', 'common.message', ($scope, message) ->
  $scope.app_name = APP_NAME
  # message.subscribe 'app'

  # $rootScope.$on 'message', ->
  #   console.log arguments

  # message.publish 'app:started', app_name: APP_NAME, event: 'started'
]
