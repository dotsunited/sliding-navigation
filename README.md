Sliding Navigation
==================

Sliding Navigation utilities.

Usage
-----

With webpack:

```javascript
var setup = require('dotsunited-sliding-navigation/lib/setup');
setup('sliding-navigation');
```

```less
@import "~dotsunited-sliding-navigation/lib/mixins";

.sliding-navigation {
    .dotsunited-sliding-navigation();

    // Custom styles
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
}

.sliding-navigation__open-button {
    .dotsunited-sliding-navigation-open-button();
}

.sliding-navigation__back-button {
    .dotsunited-sliding-navigation-back-button();
}
```

HTML
-----

```html
<nav class="sliding-navigation">
    <ul>
        <li>
            <a href="">Link</a>
            <ul>
                <li><a href="">Sub-Link</a></li>
            </ul>
        </li>
    </ul>
</nav>
```

License
-------

Copyright (c) 2015-2016 Dots United GmbH.
Released under the [MIT](LICENSE?raw=1) license.
