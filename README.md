# ro-dropdown

A simple dropdown component for Angular apps. Markup and behavior only; bring your own stylesheet. Also works out-of-the-box with Bootstrap 3 styles.

## Example

``` html
<ro-dropdown>
  <ro-dropdown-toggle>Click Me</ro-dropdown-toggle>
  <ro-dropdown-list>
    <li ng-repeat="item in items">
      <a ng-href="{{ item.url }}">{{ item.name }}</a>
    </li>
  </ro-dropdown-list>
</ro-dropdown>
```
