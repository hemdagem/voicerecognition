(function () {

    var span = document.getElementById("outputSpan");

    var recognition = new webkitSpeechRecognition();
    //recognition.continuous = true;
    recognition.lang = "en-GB";

    recognition.onresult = function (event) {
        console.log(event);

        if (event.results.length == 0) {
            return;
        }

        for (var i = 0; i < event.results.length; i++) {

            var currentEvent = event.results[i];
            span.innerHTML += currentEvent[0].transcript + " ";
        }

    };
    recognition.start();

})();
