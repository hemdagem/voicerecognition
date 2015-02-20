(function () {

    var outputSpan = document.getElementById("outputSpan");
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-GB";

    recognition.onresult = function (event) {

        console.log(event);

        if (event.results.length === 0) {
            return;
        }

        var currentEvent = event.results[event.results.length - 1];
        outputSpan.innerHTML += currentEvent[0].transcript + " ";
    };

    recognition.onerror = function(event) {
        console.log(event);
    };

    Config.StartRecording = function() {
        recognition.start();
    };

    Config.StopRecording = function() {
        recognition.stop();
    };

})();
