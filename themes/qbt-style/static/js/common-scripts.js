$(window).on('load', function () {
    enquire.register("screen and (min-width: 992px)", {
        match: function() {
            $(".preloader").fadeOut(900);
        },
        unmatch: function(){}
    });
    enquire.register("screen and (max-width: 991px)", {
        match: function() {
            $(".preloader").delay(1000).fadeOut(400);
            setTimeout(function(){
                $('.mb-header').addClass('mb-show');
                $('.section--s1 .section-in').addClass('mb-show');
            }, 1200);
            
        },
        unmatch: function(){}
    });
});

$(document).ready(function(){

    "use strict";

    // Slick Init
    enquire.register("screen and (max-width: 991px)", {
        match: function() {
            $('.section').each(function(i, e){
                $(this).find('.mb-slick-t2').slick({
                    arrows: false,
                    dost: true,
                    speed: 500,
                    infinite: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    // appendDots: $(this).find('.slick-dots-wrap'),
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        }
                    ],
                });
            });
        },
        unmatch: function(){}
    });

    enquire.register("screen and (max-width: 767px)", {
        match: function() {
            var sub_sections = [];
            $('.section').each(function(i, e){
                sub_sections[i] = $(this).find('.mb-slick').slick({
                    dost: true,
                    arrows: false,
                    speed: 500,
                    infinite: false,
                });
            });
        },
        unmatch: function(){}
    });



    // Main Animations
    var sections = $('.owl-sections');
    sections.owlCarousel({
        singleItem: true,
        autoPlay: false,
        navigation: false,
        pagination: false,
        slideSpeed: 0,
        paginationSpeed: 0,
        rewindSpeed: 0,
        mouseDrag: false,
        touchDrag: false,
        addClassActive: true,
        rewindNav: false,
        transitionStyle: 'fade',
    });

    $('.js-main-animate').on('click', 'a:not(.no-main-animate)', function(){
        var th = $(this),
            section_curent = $('.section.active'),
            section_next = $(th.attr('href')),
            section_next_pos = section_next.closest('.owl-item').index(),
            main_container = $('.main-container'),
            contacts = $('.footer');

        if(section_curent.attr('id') != section_next.attr('id')) {

            contacts.removeClass('active');
            section_curent.removeClass('top');

            $('.js-main-animate a:not(.no-main-animate)').removeClass('active');
            $('a[href="'+th.attr('href')+'"]').addClass('active');
    
            enquire.register("screen and (min-width: 992px)", {
                match: function() {
                    // Animation: Section About
                    if(section_curent.attr('id') == 'about') {
                        section_curent.addClass('out');

                        setTimeout(function(){
                            main_container.addClass('fade-out');
                        }, 400);

                        setTimeout(function(){
                            sections.trigger('owl.goTo', section_next_pos);
                            main_container.addClass('fade-in');

                            section_next.addClass('active');
                            section_curent.removeClass('out active');
                        }, 1300);               
                    }
                    // Animation: Section Other
                    else {
                        main_container.addClass('fade-out');

                        setTimeout(function(){
                            sections.trigger('owl.goTo', section_next_pos);
                            main_container.addClass('fade-in');
                            
                            section_next.addClass('active');
                            section_curent.removeClass('active');
                        }, 1000);
                    }
                    
                    setTimeout(function(){
                        main_container.removeClass('fade-in');
                        main_container.removeClass('fade-out');
                    }, 1700);
                },
                unmatch: function(){}
            });
            enquire.register("screen and (max-width: 991px)", {
                match: function() {
                    sections.trigger('owl.goTo', section_next_pos);

                    section_next.addClass('active');
                    section_curent.removeClass('active');

                    setTimeout(function(){
                        $('.mb-slick').slick('slickGoTo', 0, false);
                    }, 200);
                    
                },
                unmatch: function(){}
            });
        }

        return false;
    });

    $('.js-show-contacts').on('click', function(){
        var contacts = $('.footer');

        if(!contacts.hasClass('active')) {
            contacts.addClass('active');
            $('.section.active').addClass('top');
        }
        else {
            contacts.removeClass('active');
            $('.section.active').removeClass('top');
        }
        return false;
    });

    // Parallax for Section 1
    enquire.register("screen and (min-width: 992px)", {
        match: function() {
            var scene = document.getElementById('scene');
            var parallax = new Parallax(scene, {
                limitX: 0,
            });
        },
        unmatch: function(){}
    });
    
    $('.news-article__title a').hover(
        function(){
            $(this).closest('.news-article').find('.news-article__img').addClass('hover');
        },
        function(){
            $(this).closest('.news-article').find('.news-article__img').removeClass('hover');
        }
    );

    // Отсекает от строки все символы свыше указанной длины
    function truncate_text(text, limit) {
        text = text.trim();
        if(text.length <= limit) {
            return text;
        }
        text = text.slice(0, limit);
        var lastSpace = text.lastIndexOf(" ");
        if(lastSpace > 0) {
            text = text.substr(0, lastSpace);
        }
        return text + "...";
    }
    enquire.register("screen and (max-width: 991px)", {
        match: function() {
            $('.news-article__title a').each(function(i, e){
                $(this).text(truncate_text($(this).text(), 50));
            });            
        },
        unmatch: function(){}
    });
    
    // MB Menu Init
    function mb_menu(){
        var th = this,
            trigger = $('.js-mb-menu'),
            mb_menu = $('.mb-menu'),
            overlay = $('.mb-menu-overlay'),
            close = $('.mb-menu__close'),
            items = $('.mb-menu__list a');
        
        th.open = function(){
            mb_menu.addClass('active');
            overlay.addClass('active');
            return 0;
        }

        th.close = function(){
            mb_menu.removeClass('active');
            overlay.removeClass('active');
            return 0;
        }

        th.item_active = function(item){
            items.removeClass('active');
            item.addClass('active');
            th.close();
        }

        th.init = function(){
            trigger.on('click', function(){
                th.open();
            });
            close.on('click', function(){
                th.close();
            });
            overlay.on('click', function(){
                th.close();
            });
            items.on('click', function(){
                if(!$(this).hasClass('active')) {
                    th.item_active($(this));
                }
            });
        }
    }
    var mb_menu = new mb_menu().init();


// end document.ready
});