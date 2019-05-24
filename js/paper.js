$(document).ready(function(){

    $("#paperBox1").hide();
    // $("#paperBox2").hide();
    $("#paperBox3").hide();
    $("#paperBox4").hide();

    //test
    $("#paper1").click(function(){
        paperBegin();
    });

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
        $("#paperBox4").fadeIn();
    }
});