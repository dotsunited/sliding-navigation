var $ = require('jquery');

module.exports = function(namespace, options) {
    namespace = namespace || 'dotsunited-sliding-navigation';

    options = $.extend({}, {
        openButtonElement: '<button class="' + namespace + '__open-button"></button>',
        backElement: '<li class="' + namespace + '__back"></li>',
        backButtonElement: '<button class="' + namespace + '__back-button">Back</button>'
    }, options);

    var parentClass = namespace + '__parent';
    var visibleClass = namespace + '__visible';
    var scrollClass = namespace + '__scroll';
    var activeId = namespace + '-active';

    $(function() {
        var container = $('.' + namespace);

        container
            .find('ul')
            .attr('role', 'menu')
            .eq(0)
            .attr('aria-activedescendant', activeId)
        ;

        container.find('a')
            .attr('tabindex', '-1')
            .hover(
            function() {
                $(this).parent().attr('id', activeId);
            },
            function() {
                $(this).parent().removeAttr('id');
            }
        )
        ;

        container
            .find('li').each(function() {
                var el = $(this),
                    sub = el.children('ul,ol')
                    ;

                el.attr('role', 'menuitem');

                if (0 === sub.length) {
                    return;
                }

                el.attr('aria-haspopup', 'true');
                sub.attr('aria-expanded', 'false');

                if (options.openButtonElement) {
                    $(options.openButtonElement)
                        .prependTo(el)
                        .on('click', function(e) {
                            e.preventDefault();

                            var closest = el.closest('ul,ol')
                                    .addClass(parentClass)
                                    .removeClass(scrollClass)
                                ;

                            sub.addClass(visibleClass);
                            sub.attr('aria-expanded', 'true');

                            setTimeout(function() {
                                closest.removeClass(visibleClass);
                                sub.addClass(scrollClass);
                            }, 350);
                        })
                    ;
                }

                if (options.backButtonElement) {
                    $(options.backButtonElement)
                        .html(el.children('a').eq(0).html())
                        .wrap(options.backElement)
                        .parent()
                        .prependTo(sub)
                        .on('click', function(e) {
                            e.preventDefault();

                            var closest = el.closest('ul,ol')
                                    .removeClass(parentClass)
                                    .addClass(visibleClass)
                                ;

                            sub.removeClass(scrollClass);
                            sub.attr('aria-expanded', 'false');

                            setTimeout(function() {
                                closest.addClass(scrollClass);
                                sub.removeClass(visibleClass);
                            }, 350);
                        })
                    ;
                }
            })
        ;
    });
};
