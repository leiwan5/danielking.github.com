angular.module('core').run(['$templateCache', function($templateCache) {

  $templateCache.put('desktop.html',
    ""
  );


  $templateCache.put('navbar.html',
    "<nav class=\"navbar navbar-default navbar-fixed-top\">\r" +
    "\n" +
    "  <ul class=\"nav navbar-nav\">\r" +
    "\n" +
    "    <li>\r" +
    "\n" +
    "      <a class=\"navbar-brand dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\r" +
    "\n" +
    "        jOS\r" +
    "\n" +
    "      </a>\r" +
    "\n" +
    "      <ul class=\"dropdown-menu\">\r" +
    "\n" +
    "        <li><a href=\"#\"><i class=\"icon-cog\"></i> Settings</a></li>\r" +
    "\n" +
    "        <li class=\"divider\"></li>\r" +
    "\n" +
    "        <li><a href=\"#\"><i class=\"icon-user\"></i> Login</a></li>\r" +
    "\n" +
    "      </ul>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "  </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <ul class=\"nav navbar-nav\">\r" +
    "\n" +
    "    <li ng-repeat=\"app in $$apps\" ng-class=\"{active: app.actived}\">\r" +
    "\n" +
    "      <a href=\"#\" ng-click=\"activeApp(app)\">\r" +
    "\n" +
    "        <i class=\"icon-th-large\"></i>\r" +
    "\n" +
    "        {{app.title}}\r" +
    "\n" +
    "      </a>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "  </ul>\r" +
    "\n" +
    "  <ul class=\"nav navbar-nav pull-right\">\r" +
    "\n" +
    "    <li class=\"dropdown\">\r" +
    "\n" +
    "      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r" +
    "\n" +
    "        <i class=\"icon-reorder\"></i>\r" +
    "\n" +
    "      </a>\r" +
    "\n" +
    "      <ul class=\"dropdown-menu\">\r" +
    "\n" +
    "        <li><a href=\"#\">Exit</a></li>\r" +
    "\n" +
    "      </ul>\r" +
    "\n" +
    "    </li>\r" +
    "\n" +
    "  </ul>\r" +
    "\n" +
    "</nav>"
  );

}]);
