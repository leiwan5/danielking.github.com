angular.module('com_jedisto_jedios_clock').run(['$templateCache', function($templateCache) {

  $templateCache.put('main.html',
    "clock\r" +
    "\n" +
    "<button class=\"btn btn-primary\">hello</button>"
  );

}]);
