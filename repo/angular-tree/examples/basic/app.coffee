window.App = angular.module 'angular_tree_basic', ['$angularTree.directives']

window.App.controller 'AppController', ($scope) ->
	$scope.logs = []
	$scope.treeOptions = 
		getChildren: (node, cb) ->
			cb [
				{label: 'hello'},
				{label: 'hi'}
			]
		onLabelClick: (node) ->
			$scope.logs = [
				{text: 'selected: ' + JSON.stringify(label:node.label, level:node.level)}
			].concat $scope.logs
		onExpanderClick: (node) ->
			$scope.logs = [
				{text: (if node.expanded then 'expanded' else 'collapsed') + ': ' + JSON.stringify(label:node.label, level:node.level)}
			].concat $scope.logs


	$scope.treeRootNodes = [
			{label: 'hello'},
			{label: 'hi'}
		]
