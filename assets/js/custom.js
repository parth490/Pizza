/*  jQuery Nice Select - v1.0
https://github.com/hernansartorio/jquery-nice-select
Made by HernÃ¡n Sartorio  */
!function (e) { e.fn.niceSelect = function (t) { function s(t) { t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>')); var s = t.next(), n = t.find("option"), i = t.find("option:selected"); s.find(".current").html(i.data("display") || i.text()), n.each(function (t) { var n = e(this), i = n.data("display"); s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text())) }) } if ("string" == typeof t) return "update" == t ? this.each(function () { var t = e(this), n = e(this).next(".nice-select"), i = n.hasClass("open"); n.length && (n.remove(), s(t), i && t.next().trigger("click")) }) : "destroy" == t ? (this.each(function () { var t = e(this), s = e(this).next(".nice-select"); s.length && (s.remove(), t.css("display", "")) }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this; this.hide(), this.each(function () { var t = e(this); t.next().hasClass("nice-select") || s(t) }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function (t) { var s = e(this); e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus() }), e(document).on("click.nice_select", function (t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (t) { var s = e(this), n = s.closest(".nice-select"); n.find(".selected").removeClass("selected"), s.addClass("selected"); var i = s.data("display") || s.text(); n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change") }), e(document).on("keydown.nice_select", ".nice-select", function (t) { var s = e(this), n = e(s.find(".focus") || s.find(".list .option.selected")); if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1; if (40 == t.keyCode) { if (s.hasClass("open")) { var i = n.nextAll(".option:not(.disabled)").first(); i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus")) } else s.trigger("click"); return !1 } if (38 == t.keyCode) { if (s.hasClass("open")) { var l = n.prevAll(".option:not(.disabled)").first(); l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus")) } else s.trigger("click"); return !1 } if (27 == t.keyCode) s.hasClass("open") && s.trigger("click"); else if (9 == t.keyCode && s.hasClass("open")) return !1 }); var n = document.createElement("a").style; return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this } }(jQuery);

$(document).ready(function () {

    // /********* On scroll heder Sticky *********/
    function initHeaderSticky() {
        if (jQuery(document).height() > jQuery(window).height()) {
            if (jQuery(this).scrollTop() > 100) {
                jQuery('.site-header').addClass("fixed");
            } else {
                jQuery('.site-header').removeClass("fixed");
            }
        }
    }

    $(document).ready(function () {
        initHeaderSticky()
    });
    $(window).on('resize scroll', function () {
        initHeaderSticky()
    });

    // // /********* On scroll heder back *********/
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("header-sticky").style.top = "0";
        } else {
            document.getElementById("header-sticky").style.top = "-110px";
        }
        prevScrollpos = currentScrollPos;
    }

    /********* Announcebar hide ********/
    $('#announceclose').click(function () {
        $('.announcebar').slideUp("slow");
    });

    /******  Nice Select  ******/
    $('select').niceSelect();

    /******  menu hover  ******/
    $(".menu-lnk.has-item").hover(function () {
        $(this).toggleClass("menu_active");
        $(this).find(".menu-dropdown").toggleClass("open_menu");
        $("body").toggleClass("no_scroll");
    });

    /********* Mobile Menu ********/
    $('.mobile-menu-button').on('click', function (e) {
        e.preventDefault();
        setTimeout(function () {
            $('body').addClass('no_scroll active_menu');
            $(".mobile-menu-wrapper").toggleClass("active_menu");
            $('.overlay').addClass('active');
        }, 50);
    });
    $('body').on('click', '.overlay, .menu-close-icon svg', function (e) {
        e.preventDefault();
        $('body').removeClass('no_scroll active_menu');
        $(".mobile-menu-wrapper").removeClass("active_menu");
        $('.overlay').removeClass('active');
    });

    /** footer acnav **/
    $(".footer-acnav").on("click", function () {
        if ($(window).width() < 768) {
            if ($(this).hasClass("is_open")) {
                $(this).removeClass("is_open");
                $(this).siblings(".footer-acnav-list").slideUp(200);
            } else {
                $(".footer-acnav").removeClass("is_open");
                $(this).addClass("is_open");
                $(".footer-acnav-list").slideUp(200);
                $(this).siblings(".footer-acnav-list").slideDown(200);
            }
        }
    });

    //******** progress-wrap ************//
    $(document).ready(function () {
        "use strict";

        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.progress-wrap').addClass('active-progress');
            } else {
                jQuery('.progress-wrap').removeClass('active-progress');
            }
        });
        jQuery('.progress-wrap').on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        });
    });  
   
    document.querySelectorAll('.shipping-info .custom-checkbox input[type="checkbox"]').forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        const colorNameDiv = this.closest('.colors-checkbox').querySelector('.color-name');
        const colorNamePath = this.closest('.colors-checkbox').querySelector('.color-name svg path');
        const deliveryInfoDiv = this.closest('.colors-checkbox').querySelector('.delivery-info');
  
        if (this.checked) { 
          colorNamePath.style.fill = 'var(--first-color)'; 
          colorNameDiv.style.color = 'black';
          colorNameDiv.style.fontWeight = '600'; 
          deliveryInfoDiv.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
        } else {
          // Reset SVG path fill color to default when unchecked
          colorNamePath.style.fill = ''; 
          colorNameDiv.style.color = '';
          colorNameDiv.style.fontWeight = ''; 
          deliveryInfoDiv.style.boxShadow = '';
        }
      });
    }); 
  

    /*********  Multi-level accordion nav  ********/
    $('.acnav-label').click(function () {
        var label = $(this);
        var parent = label.parent('.has-children');
        var list = label.siblings('.acnav-list');
        if (parent.hasClass('is_open')) {
            list.slideUp('fast');
            parent.removeClass('is_open');
        }
        else {
            list.slideDown('fast');
            parent.addClass('is_open');
        }
    });

    /****  TAB Js ****/
    $("ul.tabs li").click(function () {
        var $this = $(this);
        var $theTab = $(this).attr("data-tab");
        if ($this.hasClass("active")) {
        } else {
            $this
                .closest(".tabs-wrapper")
                .find("ul.tabs li, .tabs-container .tab-content")
                .removeClass("active");
            $(
                '.tabs-container .tab-content[id="' +
                $theTab +
                '"], ul.tabs li[data-tab="' +
                $theTab +
                "]"
            ).addClass("active");
        }
        $(this).addClass("active");
    });

    /********* qty spinner ********/
    var quantity = 0;
    $('.quantity-increment').click(function () {
        ;
        var t = $(this).siblings('.quantity');
        var quantity = parseInt($(t).val());
        $(t).val(quantity + 1);
    });
    $('.quantity-decrement').click(function () {
        var t = $(this).siblings('.quantity');
        var quantity = parseInt($(t).val());
        if (quantity > 1) {
            $(t).val(quantity - 1);
        }
    });

    /******* quick-view-popup Js *******/
    $(".qv-btn").click(function () {
        $(".quick-view-popup").addClass("active");
        $("body").addClass("no_scroll");
        $('.overlay').addClass('qv_active');
    });
    $(".quick-close-btn, .overlay").click(function () {
        $(".quick-view-popup").removeClass("active");
        $("body").removeClass("no_scroll");
        $('.overlay').removeClass('qv_active');
    });

    /******* sign-in-btn-popup Js *******/
    $(".sign-in-btn").click(function () {
        $(".sign-in-popup").addClass("active");
        $("body").addClass("no_scroll");
        $('.overlay').addClass('active');
    });
    $(".common-close, .overlay").click(function () {
        $(".sign-in-popup").removeClass("active");
        $("body").removeClass("no_scroll");
        $('.overlay').removeClass('active');
    });

    /******* sign-up-btn-popup Js *******/
    $(".sign-out-btn").click(function () {
        $(".sign-out-popup").addClass("active");
        $("body").addClass("no_scroll");
        $('.overlay').addClass('active');

        // ✅ Close sign-in popup when OTP popup opens
        $(".sign-in-popup").removeClass("active");
    });
    $(".common-close, .overlay").click(function () {
        $(".sign-out-popup").removeClass("active");
        $("body").removeClass("no_scroll");
        $('.overlay').removeClass('active');
    });

    /******* location-btn-popup Js *******/
    $(".location-btn").click(function () {
        $(".location-popup").addClass("active");
        $("body").addClass("no_scroll");
        $('.overlay').addClass('active');
    });
    $(".common-close, .overlay").click(function () {
        $(".location-popup").removeClass("active");
        $("body").removeClass("no_scroll");
        $('.overlay').removeClass('active');
    });

    /******* otp-popup Js *******/
    $(".submit-btn").click(function () {
        $(".otp-popup").addClass("active");
        $("body").addClass("no_scroll");
        $(".overlay").addClass("active");

        // Close sign-in popup when OTP popup opens
        $(".sign-in-popup").removeClass("active");
        $(".sign-out-popup").removeClass("active");
    });

    $(".common-close, .overlay").click(function () {
        $(".otp-popup").removeClass("active");
        $("body").removeClass("no_scroll");
        $(".overlay").removeClass("active");
    });

    /******* otp-popup Js *******/

    $(".submit-btn").click(function () {
        $(".otp-popup").addClass("active");
        $("body").addClass("no_scroll");
        $('.overlay').addClass('active top-overlay'); // Add "top-overlay" class
    });

    $(".common-close, .overlay").click(function () {
        $(".otp-popup").removeClass("active");
        $("body").removeClass("no_scroll");
        $('.overlay').removeClass('active top-overlay'); // Remove "top-overlay" class
    });

    /**quickview-slider**/
    var swiper = new Swiper(".quickview-image-slider", {
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        speed: 800,
        navigation: {
            nextEl: ".quickview-arrow.swiper-button-next",
            prevEl: ".quickview-arrow.swiper-button-prev",
        },
    });

    /*** home banner slider **/

    var sliderThumbnail = new Swiper(".banner-left-slider", {
        slidesPerView: 4,
        spaceBetween: 15,
        speed: 800,
        centeredSlides: false,
        centeredSlidesBounds: true,
        watchOverflow: true,
        watchSlidesVisibility: false,
        watchSlidesProgress: false,
        breakpoints: {
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 4,
            },
            0: {
                slidesPerView: 3,
            },
        },
    });

    var sliderMain = new Swiper(".banner-right-slider", {
        spaceBetween: 15,
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        speed: 800,
        preventInteractionOnTransition: true,
        navigation: {
            nextEl: '.pdp-arrow.swiper-button-next',
            prevEl: '.pdp-arrow.swiper-button-prev',
        },
        thumbs: {
            swiper: sliderThumbnail
        }
    });

    sliderMain.on('slideChangeTransitionStart', function () {
        sliderThumbnail.slideTo(sliderMain.activeIndex);
    });

    sliderThumbnail.on('transitionStart', function () {
        sliderMain.slideTo(sliderThumbnail.activeIndex);
    });

    /** category slider **/
    var swiper = new Swiper(".category-slider", {
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        autoplay: true,
        speed: 800,
        breakpoints: {
            1300: {
                slidesPerView: 6,
            },
            992: {
                slidesPerView: 5,
            },
            768: {
                slidesPerView: 4,
            },
            576: {
                slidesPerView: 3,
            },
            400: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    /** product slider **/
    var swiper = new Swiper(".product-slider", {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerColumn: 2,
        speed: 800,
        navigation: {
            prevEl: '.product-arrow.swiper-button-prev',
            nextEl: '.product-arrow.swiper-button-next',
        },
        grid: {
            rows: 2,
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
                spaceBetween: 20,
                grid: {
                    rows: 2,
                },
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                grid: {
                    rows: 2,
                },
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
                grid: {
                    rows: 2,
                },
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
                grid: {
                    rows: 1,
                },
            },
            500: {
                slidesPerView: 2,
                spaceBetween: 20,
                grid: {
                    rows: 1,
                },
            },
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
                grid: {
                    rows: 1,
                },
            },
        },
    });
    /** testimonial slider **/
    var swiper = new Swiper(".testimonial-slider", {
        spaceBetween: 20,
        slidesPerView: 1,
        speed: 800,
        loop: true,
        autoplay: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            prevEl: ".testimonial-arrow.swiper-button-prev",
            nextEl: ".testimonial-arrow.swiper-button-next",
        },
    });

    /** home blog -slider **/
    var swiper = new Swiper(".home-blog-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        // autoplay: true,
        navigation: {
            prevEl: '.blog-arrow.swiper-button-prev',
            nextEl: '.blog-arrow.swiper-button-next',
        },
        speed: 800,
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    // *** appointment animation input *** //
    $('input , textarea').focus(function () {
        $(this).parents('.form-group').addClass('focused');
    });
    $('input , textarea').blur(function () {
        var inputValue = $(this).val();
        if (inputValue == "") {
            $(this).removeClass('filled');
            $(this).parents('.form-group').removeClass('focused');
        } else {
            $(this).addClass('filled');
        }
    })  

    // *** video-play *** //
    $('.play-video').on('click', function () {
        if ($(this).attr('data-click') == 1) {
            $(this).attr('data-click', 0)
            $('#img-video')[0].pause();
            $(".play-video").css("opacity", "1");
        } else {
            $(this).attr('data-click', 1)
            $('#img-video')[0].play();
            $(".play-video").css("opacity", "1");
            $(".play-video").css("opacity", "0");
        }
    });

    /** client logo slider **/
    var swiper = new Swiper(".about-team-slider", {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 20,
        speed: 800,
        // autoplay: true,
        breakpoints: {
            992: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            476: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });


      /** order history slider **/
      var swiper = new Swiper(".order-slider", { 
        loop: true,
        spaceBetween: 20,
        speed: 600, 
        loop: true,
        navigation: {
            nextEl: ".order-arrow.swiper-button-next",
            prevEl: ".order-arrow.swiper-button-prev",
        },
        // autoplay: true,
        breakpoints: {
            1400: {
                slidesPerView: 3.5,
            },
            1130: {
                slidesPerView: 3,
            },
            630: {
                slidesPerView: 2,
            },
            476: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

});
