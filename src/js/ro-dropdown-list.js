angular.module('ro.dropdown')
  .directive('roDropdownList', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      templateUrl: 'ro-dropdown-list.html',
      scope: true,
      require: '^roDropdown',
      link: function(scope, elem, attrs, dropdown) {
        scope.dropdown = dropdown;
        elem.on('click touchstart', 'a', dropdown.close);
      }
    }
  })
