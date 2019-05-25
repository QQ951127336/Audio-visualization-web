$(document).ready(function(){

    // $("#paperBox1").hide();
    $("#paperBox2").hide();
    $("#paperBox3").hide();
    $("#paperBox4").hide();
    $("#paperBox5").hide();
    var clicked = false;
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
            // $.post("/vote", {
            //     option:option
            // });
            $("#paperBox4").hide();
            $("#paperBox5").show();
            audioVisual();
        }
    }

    function paperBegin() {
        paperHalf();
    }

    function paperHalf() {
        $("#paperBox1").hide();
        $("#paperBox2").fadeIn("slow",function() {
            paperFinished();
        });
    }

    function paperFinished() {
        $("#paperBox2").hide();
        $("#paperBox3").fadeIn("slow",function () {
            buttonShow();
        });
    }

    function buttonShow() {
        $("#paperBox4").fadeIn("slow");
    }
});