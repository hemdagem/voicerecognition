(function () {

    var speechSynthesis = new SpeechSynthesisUtterance();

    Config.SpeechSynthesis.Speak = function (text) {
        
        speechSynthesis.text = text;
        window.speechSynthesis.speak(speechSynthesis);
    };

})();