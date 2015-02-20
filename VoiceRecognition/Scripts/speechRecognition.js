(function () {

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-GB";

    recognition.onresult = function (event) {

        console.log(event);

        if (event.results.length === 0) {
            return;
        }

        returnResult(event.results);
    };
    
    function returnResult(results) {
        var outputSpan = document.getElementById("outputSpan");
        var currentEvent = results[results.length - 1];
        
        outputSpan.innerHTML += currentEvent[0].transcript + " ";
        
        searchTotalJobs(outputSpan.innerHTML);
    };
    
    function searchTotalJobs(keywords) {
        if (keywords.length > 0) {
            keywords = encodeURI(keywords);
            window.open("http://www.totaljobs.com/JobSearch/Results.aspx?Keywords=" + keywords);
        }
    }

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
