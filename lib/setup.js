(function(window, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            return factory($);
        });
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        window.dotsunitedSlidingNavigation = factory(window.jQuery || window.Zepto);
    }
}(typeof window !== 'undefined' ? window : this, function($) {
    function option(option, context, args) {
        while ($.isFunction(option)) {
            option = option.apply(context, args || []);
        }

        return option;
    }

    return function(namespace, options) {
        namespace = namespace || 'dotsunited-sliding-navigation';

        options = $.extend({}, {
            selector: '.' + namespace,
            openOnItemClick: false,
            openButtonElement: '<button class="' + namespace + '__open-button"></button>',
            backElement: '<li class="' + namespace + '__back"></li>',
            backButtonElement: '<button class="' + namespace + '__back-button"></button>',
            backButtonLabel: function() {
                return $(this).children('a').eq(0).html();
            }
        }, options);

        var parentClass = namespace + '__parent';
        var visibleClass = namespace + '__visible';
        var scrollClass = namespace + '__scroll';
        var activeId = namespace + '-active';

        $(function() {
            var container = $(option(options.selector));

            container
                .addClass(namespace)
                .find('ul,ol')
                .attr('role', 'menu')
                .eq(0)
                .addClass(visibleClass + ' ' + scrollClass)
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

                    var openButtonElement = option(
                        options.openButtonElement,
                        this
                    );

                    function onOpenClick(e) {
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
                    }

                    if (openButtonElement) {
                        $(openButtonElement)
                            .prependTo(el)
                            .on('click', onOpenClick)
                        ;
                    }

                    if (option(options.openOnItemClick, this)) {
                        el.on('click', '> a', onOpenClick);
                    }

                    var backButtonElement = option(
                        options.backButtonElement,
                        this
                    );

                    if (backButtonElement) {
                        $(backButtonElement)
                            .html(option(options.backButtonLabel, this))
                            .wrap(option(options.backElement, this))
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
}));
