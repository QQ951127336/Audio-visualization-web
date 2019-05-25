
function audioVisual() {
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

    audio.play();audio2.play();
    (function draw(){
        analyser.getByteFrequencyData(output);
        ctx.clearRect(0, 0, wrap.width, wrap.height);
        ctx.strokeStyle="#5780ff";
        ctx.beginPath();

        for(var i = 0; i < count; i++){
            nodes[i] = new Array();
            var delX = output[i]/waveTime;
            var delY = output[i]/waveTime;
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
        ctx.fillStyle="#65b0ff";
        ctx.fill();
        ctx.stroke();

        analyser2.getByteFrequencyData(output2);
        ctx.strokeStyle="#ff3a5c";
        ctx.beginPath();

        for(var i = 0; i < count; i++){
            var delX = output2[i]/waveTime;
            var delY = output2[i]/waveTime;
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
        // ctx.fillStyle="#ff78b3";
        // ctx.fill();
        ctx.stroke();

        requestAnimationFrame(draw);
    })();
}

