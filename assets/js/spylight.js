

$(function() {

    // Use Modernizr to detect for touch devices, 
    // which don't support autoplay and may have less bandwidth, 
    // so just give them the poster images instead
    var screenIndex = 1,
        numScreens = $('.screen').length,
        isTransitioning = false,
        transitionDur = 1000,
        BV,
        videoPlayer,
        isTouch = Modernizr.touch,
        $bigImage = $('.big-image'),
        $window = $(window);
    
    if (!isTouch) {
        // initialize BigVideo
        /*BV = new $.BigVideo({forceAutoplay:isTouch});
        BV.init();
        showVideo();
        
        BV.getPlayer().addEvent('loadeddata', function() {
            onVideoLoaded();
        });
        BV.getPlayer().addEvent('ended', function() {
            alert('ended');
            BV.getPlayer().currentTime(5);
        });
        BV.getPlayer().addEvent('timeupdate', function() {
            console.log('timeupdate');
            if (BV.getPlayer().currentTime() >= 5) {
                BV.getPlayer().stop();
                //BV.getPlayer().currentTime(5);
            }
        });*/

        // adjust image positioning so it lines up with video
        $bigImage
            .css('position','relative')
            .imagesLoaded(adjustImagePositioning);
        // and on window resize
        $window.on('resize', adjustImagePositioning);
    }
    
    // Next button click goes to next div
    $('#next-btn').on('click', function(e) {
        e.preventDefault();
        if (!isTransitioning) {
            next();
        }
    });

    function showVideo() {
        //$('#screen-'+screenIndex).attr('data-video') && BV.show($('#screen-'+screenIndex).attr('data-video'),{ambient:false});
    }

    function next() {
        isTransitioning = true;
        
        // update video index, reset image opacity if starting over
        if (screenIndex === numScreens) {
            $bigImage.css('opacity',1);
            screenIndex = 1;
        } else {
            screenIndex++;
        }
        
        if (!isTouch) {
            $('#big-video-wrap').transit({'left':'-100%'},transitionDur)
        }
            
        (Modernizr.csstransitions)?
            $('.wrapper').transit(
                {'left':'-'+(100*(screenIndex-1))+'%'},
                transitionDur,
                onTransitionComplete):
            onTransitionComplete();
    }

    function onVideoLoaded() {
        $('#screen-'+screenIndex).find('.big-image').transit({'opacity':0},500)
    }

    function onTransitionComplete() {
        isTransitioning = false;
        if (!isTouch) {
            $('#big-video-wrap').css('left',0);
            //showVideo();
        }
    }

    function adjustImagePositioning() {
        $bigImage.each(function(){
            var $img = $(this),
                img = new Image();

            img.src = $img.attr('src');

            var windowWidth = $window.width(),
                windowHeight = $window.height(),
                r_w = windowHeight / windowWidth,
                i_w = img.width,
                i_h = img.height,
                r_i = i_h / i_w,
                new_w, new_h, new_left, new_top;

            if( r_w > r_i ) {
                new_h   = windowHeight;
                new_w   = windowHeight / r_i;
            }
            else {
                new_h   = windowWidth * r_i;
                new_w   = windowWidth;
            }

            $img.css({
                width   : new_w,
                height  : new_h,
                left    : ( windowWidth - new_w ) / 2,
                top     : ( windowHeight - new_h ) / 2
            })

        });

    }

    $(document).on('mouseenter', '.pin', function () {
        if ($(this).is(":animated")) {
            return;
        }
        var oldleft = $(this).css('left'),
            oldtop = $(this).css('top'),
            oldwidth = $(this).css('width'),
            oldheight = $(this).css('height');
        $(this).addClass('active');
        $(this).stop().animate({width: 250, height: 250, left: "-=" + (250/2), top: "-=" + (250/2)}, 500, 'easeInOutSine');
        $(this).one('mouseleave', function () {
            var me = this;
            $(this).stop().animate({width: oldwidth, height: oldheight, left: oldleft, top: oldtop}, 500, 'easeInOutSine', function () {
                $(me).removeClass('active');
            });
        });
    });
    setTimeout( function () {
        document.getElementById('big-video-vid_html5_api').play();
    }, 500);
    document.getElementById('big-video-vid_html5_api').addEventListener('ended', function () {
        $("#screen-1 .pins-container").show('fast');
    });
    window.BV = BV;
});