(function() {
  angular.module('common', []);

  angular.module('core', ['common']);

  angular.module('core').run([
    'apps', '$rootScope', 'common.message', function(apps, $rootScope, message) {
      $rootScope.$$page_title = 'jOS';
      apps.load();
      return message.subscribe('app');
    }
  ]);

  window.initUi = function(el) {
    el = $(el);
    return el.find('.ui.dropdown').dropdown({
      debug: false
    });
  };

  $(function() {
    angular.bootstrap(document, ['core']);
    return initUi(document);
  });

  angular.module('core').directive('coreApp', [
    'common.message', '$http', function(message, $http) {
      return {
        link: function(scope, element, attrs) {
          return scope.$watch('app.actived', function(cur, prev) {
            if (cur && !prev) {
              message.publish('app', {
                app_name: scope.app.name,
                event: 'actived'
              });
            }
            if (cur && !scope.app.loaded) {
              return $http.get("" + scope.app.name + "/index.html").success(function(data) {
                var appBox;
                appBox = $('<div/>').appendTo(element);
                appBox.html(data);
                angular.bootstrap(appBox, [scope.app.name]);
                scope.app.loaded = true;
                message.publish('app', {
                  app_name: scope.app.name,
                  event: 'loaded'
                });
                element.addClass('app');
                return initUi(element);
              }).error(function() {});
            }
          });
        }
      };
    }
  ]);

  angular.module('core').directive('coreNavbar', [
    '$templateCache', function($templateCache) {
      return {
        template: $templateCache.get('navbar.html'),
        replace: true,
        link: function(scope, element, attrs) {}
      };
    }
  ]);

  angular.module('core').service('apps', [
    '$http', '$rootScope', function($http, $rootScope) {
      var loadCss, loadJs;
      loadJs = function(js) {
        return eval(js);
      };
      loadCss = function(css) {
        var node;
        node = document.createElement('style');
        node.innerHTML = css;
        return document.head.appendChild(node);
      };
      $(document).on('app_reg', function(evt, app) {
        $rootScope.$$apps = $rootScope.$$apps || [];
        return $rootScope.$$apps.push(app);
      });
      return {
        load: function() {
          return $http.get('settings.json').success(function(data) {
            $rootScope.$$settings = data;
            return async.eachSeries(data.apps, function(app, cb) {
              return async.waterfall([
                function(_cb) {
                  return $http.get("" + app + "/js/main.js").success(function(data) {
                    loadJs(data);
                    return _cb(null);
                  });
                }, function(_cb) {
                  return $http.get("" + app + "/js/templates.js").success(function(data) {
                    loadJs(data);
                    return _cb(null);
                  });
                }, function(_cb) {
                  return $http.get("" + app + "/css/main.css").success(function(data) {
                    loadCss(data);
                    return _cb(null);
                  });
                }, function(_cb) {
                  $rootScope.$broadcast('app_loaded', app);
                  return _cb(null);
                }
              ], function(err) {
                return cb();
              });
            }, function(err) {
              return $rootScope.$broadcast('app_loaded_all');
            });
          });
        },
        active: function(app) {
          var _app, _i, _len, _ref, _results;
          _ref = $rootScope.$$apps;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            _app = _ref[_i];
            _results.push(_app.actived = _app === app);
          }
          return _results;
        }
      };
    }
  ]);

  angular.module('common').service('common.github', [
    '$rootScope', function($rootScope) {
      return {
        auth: function() {}
      };
    }
  ]);

  angular.module('common').service('common.message', [
    '$rootScope', function($rootScope) {
      return {
        publish: function(message, data) {
          return PubSub.publish(message, data);
        },
        subscribe: function(message) {
          return PubSub.subscribe(message, function(message, data) {
            return $rootScope.$emit('message', message, data);
          });
        }
      };
    }
  ]);

  angular.module('core').controller('CoreController', [
    '$scope', '$rootElement', 'apps', 'common.message', 'common.github', function($scope, $rootElement, apps, message, github) {
      $rootElement.attr('id', 'core');
      $scope.desktopActive = true;
      $scope.$on('app_loaded_all', function() {
        $scope.show = true;
        return $scope.$digest();
      });
      $scope.activeApp = function(app) {
        $scope.desktopActive = false;
        return apps.active(app);
      };
      $scope.toggleDesktop = function() {
        return $scope.desktopActive = !$scope.desktopActive;
      };
      return $scope.$on('msg', function(evt, data) {});
    }
  ]);

  angular.module('core').controller('DesktopController', ['$scope', function($scope) {}]);

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/