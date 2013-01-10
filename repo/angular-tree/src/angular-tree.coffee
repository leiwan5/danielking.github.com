array_insert = (array, item, newItems, pos) ->
	idx = array.indexOf item
	unless idx == -1
		array.concat newItems, array.splice idx + (if pos == 'right' then 1 else 0)
	else
		array

angular.module('$angularTree.config', []).value('$angularTree.config', {});
angular.module('$angularTree.filters', ['$angularTree.config']);
angular.module('$angularTree.directives', ['$angularTree.config']);
angular.module('$angularTree', ['$angularTree.filters', '$angularTree.directives', '$angularTree.config']);

angular.module('$angularTree.directives').directive 'angularTree', () ->
	template: '''<div>
		<div angular-tree-node ng-repeat="node in nodes"
			data-node="node" data-options="options"></div></div>'''
	replace: true
	scope:
		nodes: '=nodes'
		options: '=options'
	link: (scope, element, attrs) ->
		scope.onExpanderClick = (node) ->
			node.level = 0 unless node.level
			unless node.loaded
				if scope.options.getChildren
					scope.options.getChildren node, (data) ->
						for item in data
							item.level = node.level + 1
							item.parent = node
						scope.nodes = array_insert scope.nodes, node, data, 'right'
						node.loaded = true
						node.expanded = true
			else
				node.expanded = not node.expanded

		scope.onLabelClick = (node) ->
			for item in scope.nodes
				item.selected = false
			node.selected = true


angular.module('$angularTree.directives').directive 'angularTreeNode', () ->
	template: '''<div class="angular-tree-node" ng-show="node.visible" ng-class="nodeClass">
		<i ng-style="{marginLeft: node.level + 'em'}"></i>
		<i ng-class="expanderClass" class="icon-chevron-right angular-tree-node-expander" ng-click="onExpanderClick(node); options.onExpanderClick(node)"></i>
		<span class="angular-tree-node-label" ng-click="onLabelClick(node); options.onLabelClick(node);">{{node.label}}</span>
	</div>'''
	replace: true
	link: (scope, element, attrs) ->
		scope.$watch 'node.parent.expanded', (expanded) ->
			if scope.node.parent
				scope.node.visible = expanded
			else
				scope.node.visible = true
		scope.$watch 'node.parent.visible', (visible) ->
			if scope.node.parent
				scope.node.visible = visible
			else
				scope.node.visible = true
		scope.$watch 'node.expanded', (v) ->
			scope.expanderClass = if v then 'icon-chevron-down' else 'icon-chevron-right'
		scope.$watch 'node.selected', (v) ->
			scope.nodeClass = if v then 'selected' else ''