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

    var globalIdCounter = 0;

    return function(namespace, options) {
        namespace = namespace || 'dotsunited-sliding-navigation';

        options = $.extend({}, {
            selector: '.' + namespace,
            openOnItemClick: false,
            openButtonElement: '<button class="' + namespace + '__open-button"></button>',
            backElement: '<li class="' + namespace + '__back"></li>',
            backButtonElement: '<button class="' + namespace + '__back-button"></button>',
            backButtonLabel: function() {
                return $(this).children('a,span').eq(0).html();
            },
            openButtonLabel: function() {
                return $(this).children('a,span').eq(0).html();
            }
        }, options);

        var labelledById = function(el) {
            var id = el.attr('id');

            if (!id) {
                id =  namespace + '-labelledby-' + (++globalIdCounter);
                el.attr('id', id);
            }

            return id;
        };

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
                .attr('tabindex', '0')
                .attr('aria-activedescendant', activeId)
            ;

            container
                .on('mouseenter', 'a,span,button', function() {
                    $(this).parent().attr('id', activeId);
                })
                .on('mouseleave', 'a,span,button', function() {
                    $(this).parent().removeAttr('id');
                })
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

                        sub
                            .addClass(visibleClass)
                            .attr('aria-expanded', 'true')
                            .attr('aria-hidden', 'false')
                        ;

                        setTimeout(function() {
                            closest.removeClass(visibleClass);
                            sub.addClass(scrollClass);
                        }, 350);
                    }

                    var openButton = $(), labelledBy;

                    if (openButtonElement) {
                        openButton = $(openButtonElement)
                            .prependTo(el)
                            .on('click', onOpenClick)
                        ;
                    }

                    if (option(options.openOnItemClick, this)) {
                        labelledBy = el
                            .find('> a,> span')
                            .attr('aria-haspopup', 'true')
                            .on('click', onOpenClick)
                        ;

                        openButton
                            .attr('aria-hidden', 'true')
                        ;
                    } else {
                        labelledBy = openButton
                            .attr('aria-haspopup', 'true')
                            .html(option(options.openButtonLabel, this))
                        ;
                    }

                    sub
                        .attr('aria-expanded', 'false')
                        .attr('aria-hidden', 'true')
                        .attr('aria-labelledby', labelledById(labelledBy))
                    ;

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

                                sub
                                    .removeClass(scrollClass)
                                    .attr('aria-expanded', 'false')
                                    .attr('aria-hidden', 'true')
                                ;

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
