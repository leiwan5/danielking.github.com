angular.module('com_jedisto_jedios_bookmarks').run(['$templateCache', function($templateCache) {

  $templateCache.put('main.html',
    "clock\r" +
    "\n" +
    "<button class=\"btn btn-primary\">hello</button>"
  );

}]);
