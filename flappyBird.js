var canvas = document.getElementById("canvas");
var content = canvas.getContext("2d");

var bird = new Image();
bird.src = "images/bird.png";

var bg = new Image();
bg.src = "bg.png";

var pipeN = new Image();
pipeN.src = "images/pipeNorth.png";

var pipeS = new Image();
pipeS.src = "images/pipeSouth.png";

var fg = new Image();
fg.src = "images/fg.png";

var fly = new Audio();
fly.src = "sounds/fly.mp3";

var scAudio = new Audio();
scAudio.src = "sounds/score.mp3";

var px = 150;
var py = 0;
var bx = 40;
var by = 260;
var score = 0;
var constant = pipeN.height + 80;

var pipe = [];
pipe[0] = {
    x : canvas.width,
    y : 0 
};


document.addEventListener("keydown",moveBird);

function moveBird(e)
{
    by=by-20;
    fly.play();
}

function draw(){
    content.drawImage(bg,0,0);
    content.drawImage(bird,bx,by);
    
    for( var i = 0  ; i < pipe.length ; i++)
    {
        constant = pipeN.height + 80;

        content.drawImage(pipeN,pipe[i].x,pipe[i].y);
        content.drawImage(pipeS,pipe[i].x,pipe[i].y + constant);
        pipe[i].x--;

        if(pipe[i].x == 100)
        {
            pipe.push(
            {
                x : canvas.width,
                y : Math.floor(Math.random()*pipeN.height) - pipeN.height
            });
        }

        if(pipe[i].x == 3)
        {
            score++;
            scAudio.play();
        }

        if( bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeN.width && (by <= pipe[i].y + pipeN.height || by+bird.height >= pipe[i].y+constant) || by + bird.height >=  canvas.height - fg.height)
        location.reload();
        
    }

    by = by+1.5; 

    content.drawImage(fg,0,canvas.height-fg.height+10);

    content.fillStyle = "#000";
    content.font = "20px Verdana";
    content.fillText("Score : "+score,10,canvas.height-10);

    

    requestAnimationFrame(draw); 
}
draw();