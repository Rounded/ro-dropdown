angular.module('ro.dropdown', ['ngTouch']);

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
        elem.on('click', 'a', dropdown.close);
      }
    };
  })

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
      scope: false,
      require: '^roDropdown',
      link: function(scope, elem, attrs, dropdown) {
        scope.dropdown = dropdown;
      }
    }
  })

angular.module('ro.dropdown')
  .directive('roDropdown', function() {

    var instances = 0;

    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      template: function(tElem, tAttrs) {
        var tag = tAttrs.tagName || 'div';
        var html = '<' + tag + ' class="dropdown" data-ng-transclude></' + tag + '>';
        return html;
      },
      scope: true,
      controller: ['$scope', '$element', function($scope, $element) {

        var dropdown = this;

        // increment instances to assign a unique id for aria-labelledby to use
        dropdown.toggleId = 'ro-dropdown-toggle-' + (++instances);

        var backdropHtml = '<div class="dropdown-backdrop"></div>';

        dropdown.open = function() {
          $element.addClass('open');
          angular.element(backdropHtml)
            .insertBefore($element.find('.dropdown-menu'))
            .on('click touchstart', dropdown.close);
        };

        dropdown.close = function() {
          angular.element('.dropdown-backdrop').remove();
          $element.removeClass('open');
        };

        dropdown.isOpen = function() {
          return $element.hasClass('open');
        };

        // store a selector for focusable elements
        var focusable = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

        $element.on('keydown', function(evt) {

          if (evt.which !== 38 && evt.which !== 40) return;

          var $target = angular.element(evt.target);
          var $focusableItems;

          // down arrow pressed when focusing dropdown-toggle
          if ($target.is('.dropdown-toggle') && evt.which == 40) {
            if (dropdown.isOpen()) {
              $element.find('.dropdown-menu').find(focusable).first().trigger('focus');
            } else {
              dropdown.open();
            }
          } else {
            // select all focusable items within dropdown-menu
            $focusableItems = $element.find('.dropdown-menu').find(focusable);
            var focusedIndex = $focusableItems.index(evt.target);
            // default behavior is to focus the first item
            var nextFocusedIndex = 0;
            // if the target is in $focusableItems...
            if (~focusedIndex) {
              // up arrow focuses the previous item
              if (evt.which == 38 && focusedIndex > 0) {
                nextFocusedIndex = focusedIndex - 1;
              }
              // down arrow focuses the next item
              if (evt.which == 40 && focusedIndex < $focusableItems.length - 1) {
                nextFocusedIndex = focusedIndex + 1;
              }
            }

            $focusableItems.eq(nextFocusedIndex).trigger('focus');

          }

        })

      }],
      controllerAs: 'dropdown'
    };
  })

angular.module('ro.dropdown').run(['$templateCache', function($templateCache) {
    $templateCache.put('ro-dropdown-item.html',
        "<li role=\"presentation\" data-ng-transclude></li>\n");
}]);
angular.module('ro.dropdown').run(['$templateCache', function($templateCache) {
    $templateCache.put('ro-dropdown-list.html',
        "<ul class=\"dropdown-menu\" role=\"menu\" data-ng-attr-aria-labelledby=\"{{ dropdown.toggleId }}\" data-ng-transclude></ul>\n");
}]);
angular.module('ro.dropdown').run(['$templateCache', function($templateCache) {
    $templateCache.put('ro-dropdown.html',
        "<div class=\"dropdown\" data-ng-transclude></div>\n");
}]);