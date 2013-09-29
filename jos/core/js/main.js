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

  $(function() {
    return angular.bootstrap(document, ['core']);
  });

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
      loadCss = function(css) {};
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
          var appViewport, _app, _i, _len, _ref, _results;
          appViewport = $("#" + app.name);
          if (appViewport.length === 0) {
            return $http.get("" + app.name + "/index.html").success(function(data) {
              var _app, _i, _len, _ref, _results;
              $('#apps > .app').hide();
              appViewport = $('<div/>');
              appViewport.attr({
                id: app.name
              }).addClass('app').append(data).appendTo($('#apps'));
              angular.bootstrap(appViewport, [app.name]);
              app.loaded = true;
              _ref = $rootScope.$$apps;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                _app = _ref[_i];
                _results.push(_app.actived = _app === app);
              }
              return _results;
            }).error(function() {});
          } else if (appViewport.length === 1) {
            $('#apps > .app').hide();
            appViewport.show();
            _ref = $rootScope.$$apps;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              _app = _ref[_i];
              _results.push(_app.actived = _app === app);
            }
            return _results;
          }
        }
      };
    }
  ]);

  angular.module('common').service('common.message', [
    '$rootScope', '$rootElement', function($rootScope, $rootElement) {
      if ($rootElement[0] === document) {
        $(document).data('channels', {});
        $(document).on('msg', function(evt, data) {
          var channels, scope, _i, _len, _ref, _results;
          channels = $(document).data('channels');
          if (channels[data.channel]) {
            _ref = channels[data.channel];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              scope = _ref[_i];
              _results.push(scope.$broadcast('msg', {
                from: evt.target.id,
                channel: data.channel,
                message: data.message
              }));
            }
            return _results;
          }
        });
      }
      return {
        publish: function(channel, message) {
          return $rootElement.trigger('msg', {
            channel: channel,
            message: message
          });
        },
        subscribe: function(channel) {
          var channels;
          channels = $(document).data('channels');
          channels[channel] = channels[channel] || [];
          return channels[channel].push($rootScope);
        }
      };
    }
  ]);

  angular.module('core').controller('CoreController', [
    '$scope', '$rootElement', 'apps', 'common.message', function($scope, $rootElement, apps, message) {
      $rootElement.attr('id', 'core');
      $scope.$on('app_loaded_all', function() {
        $scope.show = true;
        return $scope.$digest();
      });
      $scope.activeApp = function(app) {
        return apps.active(app);
      };
      return $scope.$on('msg', function(evt, data) {
        return console.log(evt, data);
      });
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/