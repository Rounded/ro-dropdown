angular.module('ro.dropdown')
  .directive('roDropdownToggle', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      template: function(tElem, tAttrs) {
        var tag = tAttrs.tagName || 'a';
        var html = '<' + tag + ' class="dropdown-toggle" data-ng-attr-id="{{ dropdown.toggleId }}" data-ng-click="dropdown.open()" data-ng-transclude></' + tag + '>';
        return html;
      },
      scope: true,
      require: '^roDropdown',
      link: function(scope, elem, attrs, dropdown) {
        scope.dropdown = dropdown;
      }
    }
  })
