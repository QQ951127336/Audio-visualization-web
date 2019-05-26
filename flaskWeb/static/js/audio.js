
function audioVisual(intervalTime, callback) {
    var interval = 10;
    var count = 360/interval;
    var wrap = document.getElementById("wrap");
    var ctx = wrap.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 15;
    ctx.globalAlpha = 0.8;
// ctx.
    var R = wrap.height/2 -10;
    var waveTime = 1;
    var center = [ wrap.width/2,  wrap.height/2];
    var nodes = new Array();
//创建数据
    var output = new Uint8Array(count);

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext;
//加载媒体
    var audio = new Audio("static/piano.mp3");
//创建节点
    var source = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();
//连接：source → analyser → destination
    source.connect(analyser);
    analyser.connect(context.destination);

    var AudioContext2 = window.AudioContext || window.webkitAudioContext;
    var context2 = new AudioContext2;
    var audio2 = new Audio("static/guitar.mp3");
    var source2 = context2.createMediaElementSource(audio2);
    var analyser2 = context2.createAnalyser();
    source2.connect(analyser2);
    analyser2.connect(context2.destination);
    var output2 = new Uint8Array(count);

    var likeData = parseInt($("#likeData")[0].innerHTML);
    var dislikeData = parseInt($("#dislikeData")[0].innerHTML);
    console.log(likeData);
    console.log(dislikeData);
    audio.addEventListener('ended', function () {
        setTimeout(intervalTime, callback);
    }, false);
    audio.play();audio2.play();
    (function draw(){
        analyser.getByteFrequencyData(output);
        analyser2.getByteFrequencyData(output2);
        ctx.clearRect(0, 0, wrap.width, wrap.height);
        var data = new Array();
        if(likeData >= dislikeData) {
            data[0] = {output:output, lineColor:"#5780ff", fillColor:"#65b0ff"};
            data[1] = {output:output2, lineColor:"#ff3a5c", fillColor:"#ff78b3"};
        } else{
            data[0] = {output:output2, lineColor:"#ff3a5c", fillColor:"#ff78b3"};
            data[1] = {output:output, lineColor:"#5780ff", fillColor:"#65b0ff"};
        }
        ctx.clearRect(0, 0, wrap.width, wrap.height);
        for(var lineIndex =0; lineIndex < 2; lineIndex++){
            ctx.strokeStyle=data[lineIndex].lineColor;
            ctx.beginPath();

            for(var i = 0; i < count; i++){
                nodes[i] = new Array();
                var delX = data[lineIndex].output[i]/waveTime;
                var delY = data[lineIndex].output[i]/waveTime;
                nodes[i][0] = Math.cos(i*interval/180 * Math.PI)*(R - delX) + center[0];
                nodes[i][1] = Math.sin(i*interval/180 * Math.PI)*(R - delY) + center[1];
            }
            for(var i = 0; i < count; i++){
                if(i == 0) {
                    ctx.moveTo(nodes[i][0], nodes[i][1]);
                } else {
                    ctx.quadraticCurveTo(nodes[i%count][0], nodes[i%count][1], (nodes[(i+1)%count][0] + nodes[i%count][0])/2, (nodes[(i+1)%count][1]+nodes[i%count][1])/2);
                }

            }

            ctx.quadraticCurveTo(nodes[0][0], nodes[0][1], (nodes[1][0]+nodes[0][0])/2 , (nodes[1][1]+nodes[0][1])/2);
            ctx.closePath();
            ctx.fillStyle=data[lineIndex].fillColor;
            if(lineIndex ==0)
                ctx.fill();
            ctx.stroke();
        }
        requestAnimationFrame(draw);
    })();

}

