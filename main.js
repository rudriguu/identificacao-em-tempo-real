img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
   

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "")
        {
            r = random(255);
            g = random(255);
            b = random(255);
            objectDetector.detect(video, gotResult);
            for (i = 0; i < objects.length; i++) {
                document.getElementById("status").innerHTML = "Status: Objeto Detectado";
                document.getElementById("numberOfObjects").innerHTML = "Quantidade de Objetos Detectados: "+ objects.length;
                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[1].y + 15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}