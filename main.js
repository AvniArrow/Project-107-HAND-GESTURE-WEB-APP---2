Webcam.set
({
    width:350,
    height:350,
    image_format:'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach ('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wlo-BQ2m6/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function speak () {
    var synth = window.speechSynthesis;
    speak_data1 = "The first Prediction is"+ Prediction_1;
    speak_data2 = "And the second Prediction is"+ Prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label; 
        Prediction_1 = result[0].label;
        Prediction_2 = result[0].label;
        speak();

        if(result[0].label == "Happy")
        {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }

        if(result[0].label == "Sad")
        {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

        if(result[0].label == "Angery")
        {
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }
        

        if(result[1].label == "Happy")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }

        if(result[1].label == "Sad")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }

        if(result[1].label == "Angery")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }
    }
}