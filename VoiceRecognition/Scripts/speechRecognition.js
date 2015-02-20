(function () {

    var speechOutput = "";
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-GB";
    
    function returnResult(results) {
        var currentEvent = results[results.length - 1];
        speechOutput += currentEvent[0].transcript + " ";
    };

    function viewSpeechResults() {
        var outputSpan = document.getElementById("outputSpan");
        outputSpan.innerHTML = speechOutput;
    }

    function searchTotalJobs() {
        if (speechOutput.length > 0) {
            var keywords = encodeURI(speechOutput);
            window.open("http://www.totaljobs.com/JobSearch/Results.aspx?Keywords=" + keywords);
        }
    }

    recognition.onresult = function (event) {

        console.log(event);

        if (event.results.length === 0) {
            return;
        }

        returnResult(event.results);
        viewSpeechResults();
        searchTotalJobs();
    };


    recognition.onerror = function (event) {
        console.log(event);
    };

    Config.StartRecording = function () {
        recognition.start();
    };

    Config.StopRecording = function () {
        recognition.stop();
    };

})();
