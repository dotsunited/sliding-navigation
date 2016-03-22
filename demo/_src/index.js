require('./style.less');

var setup = require('../../lib/setup');

setup('sliding-navigation');

setup('sliding-navigation', {
    selector: '.sliding-navigation2',
    openOnItemClick: true,
    openButtonElement: '<span class="sliding-navigation__open-button"></span>'
});
