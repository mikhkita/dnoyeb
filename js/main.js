$(document).ready(function(){
    $('.b-3-slider').slick({
        autoplay: true,
        autoplaySpeed: 4000
    });
    $('.b-4-slider').slick({dots: true});	
    var globPos = 0;
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        // if( device.mobile() ){
            globPos = myWidth/2;          
        // }else
    }
    $(window).resize(resize);
    resize();

    custom["run-slider"] = function(){
        $(".b-4-slider").addClass("run");
    }

    var image = new Image();
    image.src = 'images/back.jpg';

    window.addEventListener("orientationchange", resize, false);

    if( device.mobile() ){
        $(".b-white-line").removeClass("transition");
        $(".left-collumn").removeClass("fadeRight");
        $(".right-collumn").removeClass("fadeLeft");

        document.addEventListener('touchmove', function(e) {
            resize();
            var touch = e.touches[0];
            var k = getPos(touch);          

            setPos(k);
        }, false);
    }else{
        $("body").mousemove(function(e){
            globPos = e.pageX;
        });

        custom["bindGirl"] = function(){
            setPos(getPos());

            setTimeout(function(){
                $(".b-white-line").removeClass("transition");
                $(".left-collumn").removeClass("fadeRight");
                $(".right-collumn").removeClass("fadeLeft");
            },500);

            $("body").mousemove(function(e){
                var k = getPos(e);          

                setPos(k);
            });
        }
    }

    

    $(".tooltip").each(function(){
        $(this).qtip({
            position: {
                my: ( ($(this).hasClass("tooltip-left"))?'middle right':'middle left'),
                at: ( ($(this).hasClass("tooltip-left"))?'middle left':'middle right'),
                adjust: {
                    x: ( ($(this).hasClass("tooltip-left"))?-15:15)
                },
                container: $(this).parents('.step')
            },
            style: {
                classes: 'qtipFont qtipCustom qtip-light qtip-white '+( ($(this).hasClass("tooltip-left"))?'':'qtip-right')+' qtip-without-border',
                tip: {
                    width: 22, height: 11, border: 0
                }
            },
            show: {
                target: $(this).parents(".step"),
                effect: function(offset) {
                    $(this).fadeIn(300);
                    TweenLite.to($(this), 0, { "scale" : 0.5, ease : Quad.easeOut } );
                    TweenLite.to($(this), 0.3, { "scale" : 1, ease : Quad.easeOut } );
                }
            },
            hide: {
                target: $(this).parents(".step")
            }
        });
    });

    function getPos(e){
        var offset = 30, //В процентах
            curPos = (typeof e != "undefined")?e.pageX:globPos,
            offset_pix = myWidth/100*offset;
            percent = (curPos-offset_pix)/(myWidth-offset_pix*2);


            // console.log(curPos);
        percent = ( percent < -2 )?-2:percent;
        percent = ( percent > 3 )?3:percent;  

        return percent;
    }

    function setPos(k){
        var width = $(".b-layers").width(),
            vector = (k-0.5)/1.5;

        $(".b-white-line").css({
            "left" : (k*100)+"%"
        });

        $(".b-capp").css({
            "width" : width*k
        });

        $(".b-bracket").css({
            "width" : width - width*k
        });

        $(".left-collumn").css({
            "opacity" : ( vector < 0 )?(1+vector):(1)
        });

        $(".right-collumn").css({
            "opacity" : ( vector > 0 )?(1-vector):(1)
        });
    }

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();
    
	var myPlace = new google.maps.LatLng(56.501057, 85.001960);
        var myOptions = {
            zoom: 17,
            center: new google.maps.LatLng(56.501557, 85.001960),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            scrollwheel: false,
            zoomControl: true
        }
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

        var marker = new google.maps.Marker({
            position: myPlace,
            icon: {
            url: "images/pin.png", // url
            scaledSize: new google.maps.Size(38, 58), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(19,58) // anchor
            },
            animation: google.maps.Animation.DROP,
            map: map,
            title: "COSMODENT"
        });

        var contentString = '<div class="gmap-bubble-marker-cont"><div class="gmap-bubble-marker"><div class="gmap-close-button icon-close"></div><p class="gmap-cont gmap-cont-1">Авторская клиника эстетической<br>стоматологии и косметологии «COSMODENT»<br><strong>Иркутский тракт, 5<br>+7 (382) 220-23-32</strong></p></div></div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
            if( $(".gmap-bubble-marker").hasClass("gmap-bubble-marker-hide") ){
                $(".gmap-bubble-marker").removeClass("gmap-bubble-marker-hide");
            }else{
                $(".gmap-bubble-marker").addClass("gmap-bubble-marker-hide");
            }
        });

        google.maps.event.addListenerOnce(map, 'idle', function(){
            infowindow.open(map,marker);
        });

        $("body").on("click",".gmap-close-button",function(){
            $(".gmap-bubble-marker").addClass("gmap-bubble-marker-hide");
        });

});