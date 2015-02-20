(function () {

    var outputSpan = document.getElementById("outputSpan"), startButton = document.getElementById("startRecording"), stopButton = document.getElementById("stopRecording");

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-GB";

    recognition.onresult = function (event) {

        console.log(event);

        if (event.results.length == 0) {
            return;
        }

        var currentEvent = event.results[event.results.length - 1];
        outputSpan.innerHTML += currentEvent[0].transcript + " ";

    };

    startButton.onclick = function() {
        recognition.start();
    };
    
    stopButton.onclick = function () {
        recognition.stop();
    };


})();
