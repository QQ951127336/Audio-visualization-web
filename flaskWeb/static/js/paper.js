$(document).ready(function(){

//    hide($("#paperBox1"));
    hide($("#paperBox2"));
    hide($("#paperBox3"));
    hide($("#paperBox4"));
    hide($("#paperBox5"));
    var clicked = false;
    var intervalTime = 1000;
    //test
    $("#paper1").click(function() {
        paperBegin();
    });

    $("#optionA").click(function() {
        vote(0);
    });

    $("#optionB").click(function() {
        vote(1);
    });

    function vote(option) {
        if(!clicked) {
            clicked = true;
            $.post("/vote", {
                option:option
            });
            hide($("#paperBox4"));
            show($("#paperBox5"));
            audioVisual(paperEndHalf);
        }
    }

    function paperEndHalf() {
        hide($("#paperBox3"));
        hide($("#paperBox4"));
        hide($("#paperBox5"));
        show($("#paperBox2"),function() {
            setTimeout(paperEnd, intervalTime);
        });
    }

    function paperEnd() {
         hide($("#paperBox2"));
         show($("#paperBox1"));
    }

    function paperBegin() {
       setTimeout(paperHalf, intervalTime);
    }

    function paperHalf() {
        hide($("#paperBox1"));
        show($("#paperBox2"), function() {
            setTimeout(paperFinished, intervalTime);
        });
        clicked = false;
    }

    function paperFinished() {
        hide($("#paperBox2"));
        show($("#paperBox3"), function () {
            setTimeout(buttonShow, intervalTime);
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