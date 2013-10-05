angular.module('core').run(['$templateCache', function($templateCache) {

  $templateCache.put('desktop.html',
    ""
  );


  $templateCache.put('navbar.html',
    "<div class=\"ui menu inverted fixed\"><div class=\"item ui dropdown\"><div class=\"text\"><strong><i class=\"icon laptop\"></i>jOS</strong></div><div class=\"menu\"><div class=\"item\"><i class=\"icon settings small\"></i>Settings</div><div class=\"item\"><i class=\"icon sign in small\"></i>Login</div></div></div><a ng-repeat=\"app in $$apps\" ng-class=\"{active: app.actived}\" ng-click=\"activeApp(app)\" class=\"item\"><i class=\"icon angle right\"></i>{{app.title}}</a><div class=\"item ui right dropdown top pointing\"><div class=\"text\"><i class=\"icon ellipsis horizontal\"></i></div><div class=\"menu\"><div class=\"item\"><i class=\"icon settings small\"></i>Settings</div><div class=\"item\"><i class=\"icon sign in small\"></i>Login</div></div></div></div>"
  );

}]);
