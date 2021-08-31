var status = "";
var img = "";
var objects = [];

function preload(){
    img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status :  Detecting Objects" ;
}

function modelLoaded(){
    console.log("Model is Loaded!");
    status = true;
    }
    
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else(results)
        console.log(results);
        objects = results;

    
    }
    
function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResults);


        for(i = 0; i < objects.length; i++ ){
            document.getElementById("status").innerHTML = "Status : Object(s) detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are- " + objects.length;
            fill(r,g,b);
            var percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "% ",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }




}
