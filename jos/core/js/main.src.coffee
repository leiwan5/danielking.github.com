angular.module 'common', []

angular.module 'core', ['common']

angular.module('core').run ['apps', '$rootScope', 'common.message', (apps, $rootScope, message) ->
  $rootScope.$$page_title = 'jOS'
  apps.load()
  message.subscribe 'app'
]

window.initUi = (el) ->
  el = $(el)
  el.find('.ui.dropdown').dropdown
    debug: false

$ ->
  angular.bootstrap document, ['core']
  initUi document

angular.module('core').directive 'coreApp', ['common.message', '$http', (message, $http) ->
  link: (scope, element, attrs) ->
    scope.$watch 'app.actived', (cur, prev) ->
      if cur and !prev
        message.publish 'app', app_name: scope.app.name, event: 'actived'
      if cur and !scope.app.loaded
        $http.get("#{scope.app.name}/index.html").success((data) ->
            appBox = $('<div/>').appendTo element
            appBox.html data
            angular.bootstrap appBox, [scope.app.name]
            scope.app.loaded = true
            message.publish 'app', app_name: scope.app.name, event: 'loaded'
            element.addClass 'app'
            initUi element
          ).error(-> )
]

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
    node = document.createElement 'style'
    node.innerHTML = css
    document.head.appendChild node

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
    for _app in $rootScope.$$apps
      _app.actived = _app == app
]

angular.module('common').service 'common.github', ['$rootScope', ($rootScope) ->
  # github = new Github username: '', password: ''
  # user = github.getUser()
  # console.log user
  # user.gists (err, gists) ->
  #   console.log gists

  auth: ->
]


angular.module('common').service 'common.message', ['$rootScope', ($rootScope) ->
  publish: (message, data) ->
    PubSub.publish message, data

  subscribe: (message) ->
    PubSub.subscribe message, (message, data) ->
      $rootScope.$emit 'message', message, data
]


angular.module('core').controller 'CoreController', ['$scope', '$rootElement', 'apps', 'common.message', 'common.github', ($scope, $rootElement, apps, message, github) ->
  $rootElement.attr 'id', 'core'
  $scope.desktopActive = true

  $scope.$on 'app_loaded_all', ->
    $scope.show = true
    $scope.$digest()
  $scope.activeApp = (app) ->
    $scope.desktopActive = false
    apps.active app

  $scope.toggleDesktop = ->
    $scope.desktopActive = !$scope.desktopActive

  $scope.$on 'msg', (evt, data) ->
    # console.log evt, data


]

angular.module('core').controller 'DesktopController', ['$scope', ($scope) ->

]
