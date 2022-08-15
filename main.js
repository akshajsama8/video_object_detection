image = "";
status_ = "";
object = [];

function preload() {

}

function setup() {
    canvas = createCanvas(350, 350);
    canvas.center(); 
    video = createCapture(VIDEO);
    video.size(350, 350);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innnerText = "Status: Detecting Objects";
} 

function modelLoaded(){
    console.log("Model is Loaded")
    status_ = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else
        console.log(results);
        object = results;
}

function draw() {
    image(video, 0, 0, 350, 350);
    if (status_ != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < object.length; i++){
        fill(r,g,b);
        percentage = floor(object[i].confidence * 100);
        text(object[i].label + " " + percentage + "%", object[i].x + 15, object[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
        document.getElementById("status").innerHTML = "Status: Object Detected"; 
        document.getElementById("no_of_objects").innerHTML = "Number of Objects Detected: " + object.length;
        }
    }
}