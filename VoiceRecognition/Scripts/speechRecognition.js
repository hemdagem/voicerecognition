(function () {

    var speechOutput = "";
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-GB";
    var modal = $('#myModal');

    Config.SpeechRecognition.StartRecording = function () {
        recognition.start();
    };

    Config.SpeechRecognition.StopRecording = function () {
        recognition.stop();
    };

    function setResult(results) {
        if (results.length > 0) {
            var currentEvent = results[results.length - 1];
            speechOutput += currentEvent[0].transcript;
        }
    };

    function speechResults() {
        $("#outputSpan").html(speechOutput);
    }

    function search() {
        if (speechOutput.length > 0) {
            var keywords = encodeURI(speechOutput);
            Config.SpeechRecognition.StopRecording();
            window.open("http://www.totaljobs.com/JobSearch/Results.aspx?Keywords=" + keywords);
            modal.modal('hide');
        }
    }

    function launchDialog() {
        modal.modal('show');
        speechOutput = "";
    }

    recognition.onresult = function (event) {
        setResult(event.results);

        if (modal.hasClass("in") === false && speechOutput === "total jobs") {
            launchDialog();
            return;
        }

        if (modal.hasClass("in")) {
            speechResults();
            search();
        }

    };

    recognition.onerror = function (event) {
        console.log(event);
    };

    Config.SpeechRecognition.StartRecording();
})();
