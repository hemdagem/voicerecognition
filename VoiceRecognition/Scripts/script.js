(function () {

    var span = document.getElementById("outputSpan");

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-GB";

    recognition.onresult = function (event) {

        console.log(event);

        if (event.results.length == 0) {
            return;
        }

        var currentEvent = event.results[event.results.length - 1];
        span.innerHTML += currentEvent[0].transcript + " ";


    };
    recognition.start();

})();
