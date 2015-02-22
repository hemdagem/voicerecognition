(function () {

    var speechOutput = "";
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-GB";

    var dialogActive = false;

    function returnResult(results) {
        var currentEvent = results[results.length - 1];
        speechOutput += currentEvent[0].transcript;
    };

    function viewSpeechResults() {
        var outputSpan = document.getElementById("outputSpan");
        outputSpan.innerHTML = speechOutput;
    }

    function searchTotalJobs() {
        if (speechOutput.length > 0) {
            var keywords = encodeURI(speechOutput);
            Config.StopRecording();
            window.open("http://www.totaljobs.com/JobSearch/Results.aspx?Keywords=" + keywords);
            $('#myModal').modal('hide');
        }
    }

    function launchDialog() {
        $('#myModal').modal('show');
        speechOutput = "";
        dialogActive = true;
    }

    recognition.onresult = function (event) {

        console.log(event);
        
        if (event.results.length === 0) {
            return;
        }

        returnResult(event.results);

        if (dialogActive === false && speechOutput === "total jobs") {
            launchDialog();
            return;
        }

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
    
    Config.StartRecording();

})();
