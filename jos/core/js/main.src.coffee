angular.module 'common', []

angular.module 'core', ['common']

angular.module('core').run ['apps', '$rootScope', 'common.message', (apps, $rootScope, message) ->
  $rootScope.$$page_title = 'jOS'
  apps.load()
  message.subscribe 'app'
]

$ ->
  angular.bootstrap document, ['core']

angular.module('core').directive 'coreNavbar', ['$templateCache' , ($templateCache) ->
	template: $templateCache.get('navbar.html')
	replace: true
	link: (scope, element, attrs) ->
]

angular.module('core').service 'apps', ['$http', '$rootScope', ($http, $rootScope) ->
  loadJs = (js) ->
    # console.log js
    eval js

  loadCss = (css) ->
    # console.log css

  $(document).on 'app_reg', (evt, app) ->
    $rootScope.$$apps = $rootScope.$$apps or []
    $rootScope.$$apps.push app

  load: ->
    $http.get('settings.json').success (data) ->
      $rootScope.$$settings = data
      
      async.eachSeries data.apps, (app, cb) ->
            async.waterfall [
                (_cb) ->
                  $http.get("#{app}/js/main.js").success (data) ->
                    loadJs data
                    _cb null
                ,
                (_cb) ->
                  $http.get("#{app}/js/templates.js").success (data) ->
                    loadJs data
                    _cb null
                ,
                (_cb) ->
                  $http.get("#{app}/css/main.css").success (data) ->
                    loadCss data
                    _cb null
                ,
                (_cb) ->
                  $rootScope.$broadcast 'app_loaded', app
                  _cb null
              ], (err) ->
                cb()
        , (err) ->
          $rootScope.$broadcast 'app_loaded_all'

  active: (app) ->
    appViewport = $("##{app.name}")
    if appViewport.length == 0
      $http.get("#{app.name}/index.html").success((data) ->
          $('#apps > .app').hide()
          appViewport = $('<div/>')
          appViewport.attr(id: app.name).addClass('app').append(data).appendTo $('#apps')
          angular.bootstrap appViewport, [app.name]
          app.loaded = true
          for _app in $rootScope.$$apps
            _app.actived = _app == app
        ).error(-> )

    else if appViewport.length == 1
      $('#apps > .app').hide()
      appViewport.show()
      for _app in $rootScope.$$apps
        _app.actived = _app == app
]

angular.module('common').service 'common.message', ['$rootScope', '$rootElement', ($rootScope, $rootElement) ->
  if $rootElement[0] == document
    $(document).data 'channels', {}
    $(document).on 'msg', (evt, data) ->
      channels = $(document).data 'channels'
      if channels[data.channel]
        for scope in  channels[data.channel]
          scope.$broadcast 'msg',
            from: evt.target.id
            channel: data.channel
            message: data.message

  publish: (channel, message) ->
    $rootElement.trigger 'msg', channel: channel, message: message

  subscribe: (channel) ->
    channels = $(document).data 'channels'
    channels[channel] = channels[channel] || []
    channels[channel].push $rootScope
]


angular.module('core').controller 'CoreController', ['$scope', '$rootElement', 'apps', 'common.message', ($scope, $rootElement, apps, message) ->
  $rootElement.attr 'id', 'core'
  $scope.$on 'app_loaded_all', ->
    $scope.show = true
    $scope.$digest()
  $scope.activeApp = (app) ->
    apps.active app

  $scope.$on 'msg', (evt, data) ->
    console.log evt, data
]
