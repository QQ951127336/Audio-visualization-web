$(document).ready(function(){
    var clicked = false;
    var intervalTime = 1000;
    var DEFAULT_FLICKER_TIMES = 6;
    var textFlickerTimes = DEFAULT_FLICKER_TIMES;
    var FLICKER_INTERVAL = 300;
    var SHAKE_TIME = 5;
    var SHAKE_INTERVAL = 300;
    var SHAKE_ANGLE = 10;
    var audioSrc = ['static/audio/makeup/', 'static/audio/marry/', 'static/audio/shopping/', 'static/audio/weak/'];
    var gifSrc = ['/static/pic/gif/Makeup.gif', '/static/pic/gif/Marry.gif', '/static/pic/gif/Shopping.gif', '/static/pic/gif/Weak.gif'];
    var gifSort = [0, 1, 2, 3];
    var nowGifSort = 0;
    gifSort.sort(randomSort);
    var playTime = 0;
    hide($("#paperBox1"));
    hide($("#paperBox2"));
    hide($("#paperBox3"));
    hide($("#paperBox4"));
    hide($("#paperBox5"));
    show($("#paperBox1"), function () {
        console.log("flick");
        textFlicker($("#paper1_text"));
    });


    //test
    $("#paper1").click(function() {
        paperBegin();
    });

    $("#optionA").click(function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if(isIOS){
            var audioLike = new Audio(audioSrc[nowGifSort-1]+"like.mp3");
            audioLike.play();
            var audioDislike = new Audio(audioSrc[nowGifSort-1]+"dislike.mp3");
            audioDislike.play();
        }else{
            vote(0);
        }
    });

    $("#optionB").click(function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if(isIOS){
            var audioLike = new Audio(audioSrc[nowGifSort-1]+"like.mp3");
            audioLike.play();
            var audioDislike = new Audio(audioSrc[nowGifSort-1]+"dislike.mp3");
            audioDislike.play();
        }else {
            vote(1);
        }
    });

    function randomSort(a, b) { return Math.random() > 0.5 ? -1 : 1; }

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
        }
    }

    function vote(option) {
        if(!clicked) {
            clicked = true;

            $.post("/vote", {
                option:option,
                id:nowGifSort
            },
            function (data, status) {
                var jsonData = JSON.parse(data);
                var like = 0;
                var dislike = 1;
                if(jsonData != null){
                    like = jsonData.like;
                    dislike = jsonData.dislike;
                }
                thumb(option, function() {
                    setTimeout(function(){
                        hide($("#paperBox4"));
                        show($("#paperBox5"));
                        audioVisual(nowGifSort, 1000, like, dislike, paperEndHalf);
                    },intervalTime);
                });
            });
        }
    }

    function thumb(option, callback) {
        var thumbs = new Array();
        thumbs[0] = $("#thumbA");
        thumbs[1] = $("#thumbB");
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
         show($("#paperBox1"), function(){
            textFlicker($("#paper1_text"));
         });
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
            setTimeout(buttonShow, intervalTime);
        });
    }

    function buttonShow() {
        $("#gifPic").attr("src", gifSrc[gifSort[playTime]]);
        nowGifSort = gifSort[playTime]+1;
        playTime = (playTime+1)%4;
        show($("#paperBox4"));
        $("#thumbA")[0].style.transform = "rotate(0deg) scale(1)";
        $("#thumbB")[0].style.transform = "rotate(0deg) scale(1)";
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