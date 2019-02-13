(function () {

    "use strict";

    if ( document.getElementById("ts-header").classList.contains("fixed-top") ){
        if( !document.getElementsByClassName("ts-homepage")[0] ) {
            document.getElementById("ts-main").style.marginTop = document.getElementById("ts-header").offsetHeight + "px";
        }
    }

})();

$(document).ready(function($) {
    "use strict";

	$('.navbar-nav .nav-link:not([href="#"])').on('click', function(){
		$('.navbar-collapse').collapse('hide');
	});

    $(".ts-img-into-bg").each(function() {
        $(this).css("background-image", "url("+ $(this).find("img").attr("src") +")" );
    });

//  Background

    $("[data-bg-color], [data-bg-image], [data-bg-pattern]").each(function() {
        var $this = $(this);

        if( $this.hasClass("ts-separate-bg-element") ){
            $this.append('<div class="ts-background">');

            // Background Color

            if( $("[data-bg-color]") ){
                $this.find(".ts-background").css("background-color", $this.attr("data-bg-color") );
            }

            // Background Image

            if( $this.attr("data-bg-image") !== undefined ){
                $this.find(".ts-background").append('<div class="ts-background-image">');
                $this.find(".ts-background-image").css("background-image", "url("+ $this.attr("data-bg-image") +")" );
                $this.find(".ts-background-image").css("background-size", $this.attr("data-bg-size") );
                $this.find(".ts-background-image").css("background-position", $this.attr("data-bg-position") );
                $this.find(".ts-background-image").css("opacity", $this.attr("data-bg-image-opacity") );

                $this.find(".ts-background-image").css("background-size", $this.attr("data-bg-size") );
                $this.find(".ts-background-image").css("background-repeat", $this.attr("data-bg-repeat") );
                $this.find(".ts-background-image").css("background-position", $this.attr("data-bg-position") );
                $this.find(".ts-background-image").css("background-blend-mode", $this.attr("data-bg-blend-mode") );
            }

            // Parallax effect

            if( $this.attr("data-bg-parallax") !== undefined ){
                $this.find(".ts-background-image").addClass("ts-parallax-element");
            }
        }
        else {

            if(  $this.attr("data-bg-color") !== undefined ){
                $this.css("background-color", $this.attr("data-bg-color") );
                if( $this.hasClass("btn") ) {
                    $this.css("border-color", $this.attr("data-bg-color"));
                }
            }

            if( $this.attr("data-bg-image") !== undefined ){
                $this.css("background-image", "url("+ $this.attr("data-bg-image") +")" );

                $this.css("background-size", $this.attr("data-bg-size") );
                $this.css("background-repeat", $this.attr("data-bg-repeat") );
                $this.css("background-position", $this.attr("data-bg-position") );
                $this.css("background-blend-mode", $this.attr("data-bg-blend-mode") );
            }

            if( $this.attr("data-bg-pattern") !== undefined ){
                $this.css("background-image", "url("+ $this.attr("data-bg-pattern") +")" );
            }

        }
    });

    $(".ts-password-toggle").on("click",function() {
        var $parent = $(this).closest(".ts-has-password-toggle");
        var $this = $(this);
        var $password = $parent.find("input");
        if ($password.attr("type") === "password") {
            $password.attr("type", "text");
            $this.find("i").removeClass("fa-eye").addClass("fa-eye-slash");
        } else {
            $password.attr("type", "password");
            $this.find("i").removeClass("fa-eye-slash").addClass("fa-eye");
        }
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $("select").each(function () {
        isSelected( $(this) );
    }).on("change", function () {
        isSelected( $(this) );
    });

    if ($(".ts-video").length > 0) {
        $(this).fitVids();
    }

    // Owl Carousel

    var $owlCarousel = $(".owl-carousel");

    if( $owlCarousel.length ){
        $owlCarousel.each(function() {

            var items = parseInt( $(this).attr("data-owl-items"), 10);
            if( !items ) items = 1;

            var nav = parseInt( $(this).attr("data-owl-nav"), 2);
            if( !nav ) nav = 0;

            var dots = parseInt( $(this).attr("data-owl-dots"), 2);
            if( !dots ) dots = 0;

            var center = parseInt( $(this).attr("data-owl-center"), 2);
            if( !center ) center = 0;

            var loop = parseInt( $(this).attr("data-owl-loop"), 2);
            if( !loop ) loop = 0;

            var margin = parseInt( $(this).attr("data-owl-margin"), 2);
            if( !margin ) margin = 0;

            var autoWidth = parseInt( $(this).attr("data-owl-auto-width"), 2);
            if( !autoWidth ) autoWidth = 0;

            var navContainer = $(this).attr("data-owl-nav-container");
            if( !navContainer ) navContainer = 0;

            var autoplay = parseInt( $(this).attr("data-owl-autoplay"), 2);
            if( !autoplay ) autoplay = 0;

            var autoplayTimeOut = parseInt( $(this).attr("data-owl-autoplay-timeout"), 10);
            if( !autoplayTimeOut ) autoplayTimeOut = 5000;

            var autoHeight = parseInt( $(this).attr("data-owl-auto-height"), 2);
            if( !autoHeight ) autoHeight = 0;

            var fadeOut = $(this).attr("data-owl-fadeout");
            if( !fadeOut ) fadeOut = 0;
            else fadeOut = "fadeOut";

            if( $("body").hasClass("rtl") ) var rtl = true;
            else rtl = false;

            if( items === 1 ){
                $(this).owlCarousel({
                    navContainer: navContainer,
                    animateOut: fadeOut,
                    autoplayTimeout: autoplayTimeOut,
                    autoplay: 1,
                    autoheight: autoHeight,
                    center: center,
                    loop: loop,
                    margin: margin,
                    autoWidth: autoWidth,
                    items: 1,
                    nav: nav,
                    dots: dots,
                    rtl: rtl,
                    navText: []
                });
            }
            else {
                $(this).owlCarousel({
                    navContainer: navContainer,
                    animateOut: fadeOut,
                    autoplayTimeout: autoplayTimeOut,
                    autoplay: autoplay,
                    autoheight: autoHeight,
                    center: center,
                    loop: loop,
                    margin: margin,
                    autoWidth: autoWidth,
                    items: 1,
                    nav: nav,
                    dots: dots,
                    rtl: rtl,
                    navText: [],
                    responsive: {
                        1368: {
                            items: items
                        },
                        992: {
                            items: 3
                        },
                        450: {
                            items: 2
                        },
                        0: {
                            items: 1
                        }
                    }
                });
            }

            if( $(this).find(".owl-item").length === 1 ){
                $(this).find(".owl-nav").css( { "opacity": 0,"pointer-events": "none"} );
            }

        });
    }

    // Magnific Popup

    var $popupImage = $(".popup-image");

    if ( $popupImage.length > 0 ) {
        $popupImage.magnificPopup({
            type:'image',
            fixedContentPos: false,
            gallery: { enabled:true },
            removalDelay: 300,
            mainClass: 'mfp-fade',
            callbacks: {
                // This prevents pushing the entire page to the right after opening Magnific popup image
                open: function() {
                    $(".page-wrapper, .navbar-nav").css("margin-right", getScrollBarWidth());
                },
                close: function() {
                    $(".page-wrapper, .navbar-nav").css("margin-right", 0);
                }
            }
        });
    }

    var $videoPopup = $(".video-popup");

    if ( $videoPopup.length > 0 ) {
        $videoPopup.magnificPopup({
            type: "iframe",
            removalDelay: 300,
            mainClass: "mfp-fade",
            overflowY: "hidden",
            iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },
                srcAction: 'iframe_src'
            }
        });
    }

    $(".ts-form-email [type='submit']").each(function(){
        var text = $(this).text();
        $(this).html("").append("<span>"+ text +"</span>").prepend("<div class='status'><i class='fas fa-circle-notch fa-spin spinner'></i></div>");
    });

    $(".ts-form-email .btn[type='submit']").on("click", function(){
        var $button = $(this);
        var $form = $(this).closest("form");
        var pathToPhp = $(this).closest("form").attr("data-php-path");
        $form.validate({
            submitHandler: function() {
                $button.addClass("processing");
                $.post( pathToPhp, $form.serialize(),  function(response) {
                    $button.addClass("done").find(".status").append(response).prop("disabled", true);
                });
                return false;
            }
        });
    });

    if( $("input[type=file].with-preview").length ){
        $("input.file-upload-input").MultiFile({
            list: ".file-upload-previews"
        });
    }

    //if( $(".ts-has-bokeh-bg").length ){

    //    $("#ts-main").prepend("<div class='ts-bokeh-background'><canvas id='ts-canvas'></canvas></div>");
    //    var canvas = document.getElementById("ts-canvas");
    //    var context = canvas.getContext("2d");
    //    var maxRadius  = 50;
    //    var minRadius  = 3;
    //    var colors = ["#5c81f9",  "#66d3f7"];
    //    var numColors  =  colors.length;

    //    for(var i=0;i<50;i++){
    //        var xPos       =  Math.random()*canvas.width;
    //        var yPos       =  Math.random()*10;
    //        var radius     =  minRadius+(Math.random()*(maxRadius-minRadius));
    //        var colorIndex =  Math.random()*(numColors-1);
    //        colorIndex     =  Math.round(colorIndex);
    //        var color      =  colors[colorIndex];
    //        drawCircle(context, xPos, yPos, radius, color);
    //    }
    //}

    function drawCircle(context, xPos, yPos, radius, color)
    {
        context.beginPath();
        context.arc(xPos, yPos, radius, 0, 360, false);
        context.fillStyle = color;
        context.fill();
    }

    heroPadding();

    var $scrollBar = $(".scrollbar-inner");
    if( $scrollBar.length ) {
        $scrollBar.scrollbar();
    }

    initializeSly();
    hideCollapseOnMobile();

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// On RESIZE actions

var resizeId;
$(window).on("resize", function(){
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);
});

// Do after resize

function doneResizing(){
    //heroPadding();
    hideCollapseOnMobile();
}

function isSelected($this){
    if( $this.val() !== "" ) $this.addClass("ts-selected");
    else $this.removeClass("ts-selected");
}

function initializeSly() {
    $(".ts-sly-frame").each(function () {

        var horizontal = parseInt( $(this).attr("data-ts-sly-horizontal"), 2);
        if( !horizontal ) horizontal = 0;

        var scrollbar = $(this).attr("data-ts-sly-scrollbar");
        if( !scrollbar ) scrollbar = 0;

        $(this).sly({
            horizontal: horizontal,
            smart: 1,
            elasticBounds: 1,
            speed: 300,
            itemNav: 'basic',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            scrollBar: $(scrollbar),
            dragHandle: 1,
            scrollTrap: 1,
            clickBar: 1,
            scrollBy: 1,
            dynamicHandle: 1
        }, {
            load: function () {
                $(this.frame).addClass("ts-loaded");
            }
        });
    });
}

function heroPadding() {
    var $header = $("#ts-header");
    var $hero = $("#ts-hero");

    if( $header.hasClass("fixed-top") ){
        if( $hero.find(".ts-full-screen").length ) {
            $hero.find(".ts-full-screen").css("padding-top", $(".fixed-top").height() );
        }
        else {
            $hero.css("padding-top", $(".fixed-top").height() );
        }
    }
    else {
        if( $hero.find(".ts-full-screen").length ) {
            $hero.find(".ts-full-screen").css("min-height", "calc( 100vh - " + $header.height() + "px" );
        }
    }
}

// Smooth Scroll

$(".ts-scroll").on("click", function(event) {
    if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
        &&
        location.hostname === this.hostname
    ) {
        var target = $(this.hash);
        var headerHeight = 0;
        var $fixedTop = $(".fixed-top");
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if( $fixedTop.length ){
            headerHeight = $fixedTop.height();
        }
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - headerHeight
            }, 1000, function() {
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    return false;
                } else {
                    $target.attr('tabindex','-1');
                    $target.focus();
                }
            });
        }
    }
});

function hideCollapseOnMobile() {
    if ($(window).width() < 575) {
        $(".ts-xs-hide-collapse.collapse").removeClass("show");
    }
}
