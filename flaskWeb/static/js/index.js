$(document).ready(function(){

   hide($("#paperBox1"));
    hide($("#paperBox2"));
    // hide($("#paperBox3"));
    // hide($("#paperBox4"));
    hide($("#paperBox5"));
    var clicked = false;
    var intervalTime = 1000;
    var DEFAULT_FLICKER_TIMES = 6;
    var textFlickerTimes = DEFAULT_FLICKER_TIMES;
    var FLICKER_INTERVAL = 300;
    var SHAKE_TIME = 5;
    var SHAKE_INTERVAL = 300;
    var SHAKE_ANGLE = 10;
    //test
    $("#paper1").click(function() {
        textFlicker($("#paper1_text"));

    });

    $("#optionA").click(function() {
        vote(0);
    });

    $("#optionB").click(function() {
        vote(1);
    });

    function shake(element, times, interval, angle,callback) {
        if(times <= 0 || element == null) {
            if(callback != null)
                callback();
        }
        else {
            if(times%2==0)
                element[0].style.transform = 'rotate('+angle+'deg)';
            else
                element[0].style.transform = 'rotate(-'+angle+'deg)';
            if(times-1 == 0)
                callback();
            else
                setTimeout(function() {shake(element, times-1, interval, angle, callback);}, interval);
        }
    }

    function textFlicker(element) {
        if(textFlickerTimes >0 ){
            if(textFlickerTimes%2 == 1)
                element[0].style.opacity = 1;
            else
                element[0].style.opacity = 0.3;
            textFlickerTimes--;
            setTimeout(function(){ textFlicker(element);}, FLICKER_INTERVAL);
        }else{
             paperBegin();
        }
    }

    function vote(option) {
        if(!clicked) {
            clicked = true;
            $.post("/vote", {
                option:option
            });
            thumb(option, function() {
                setTimeout(function(){
                    hide($("#paperBox4"));
                    show($("#paperBox5"));
                    audioVisual(paperEndHalf);
                },intervalTime);
            });
        }
    }

    function thumb(option, callback) {
        var thumbs = new Array();
        thumbs[0] = $("#thumbA");
        thumbs[1] = $("#thumbB");
        thumbs[option][0].style.transform = "rotate(0deg) scale(1)";
        thumbs[option][0].style.transform = "rotate(0deg) scale(1)";
        if(option == 0 || option == 1) {
            thumbs[option][0].style.transform = "rotate(-15deg) scale(1.5)";
            if(callback != null)
                callback();
        }
    }

    function paperEndHalf() {
        hide($("#paperBox3"));
        hide($("#paperBox4"));
        hide($("#paperBox5"));
        show($("#paperBox2"),function() {
            shake($("#paper2"), SHAKE_TIME, SHAKE_INTERVAL, SHAKE_ANGLE, paperEnd);
        });
    }

    function paperEnd() {
         hide($("#paperBox2"));
         show($("#paperBox1"));
    }

    function paperBegin() {
        paperHalf();
    }

    function paperHalf() {
        hide($("#paperBox1"));
        show($("#paperBox2"), function() {
            shake($("#paper2"), SHAKE_TIME, SHAKE_INTERVAL, SHAKE_ANGLE, paperFinished);
        });



        clicked = false;
        textFlickerTimes = DEFAULT_FLICKER_TIMES;
    }

    function paperFinished() {
        hide($("#paperBox2"));
        show($("#paperBox3"), function () {
            setTimeout(buttonShow, intervalTime*1.5);
        });
    }

    function buttonShow() {
        show($("#paperBox4"));
    }

    function show(element, callback) {
        element = element[0];
        if(element == null)
            return none;
        element.style.display = "inline";
        if(callback != null)
            callback();
    }

    function hide(element, callback) {
        element = element[0];
        if(element == null)
            return none;
        element.style.display = "none";
        if(callback != null)
            callback();
    }
});