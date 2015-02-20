var Config = Config || {};

(function () {

    var speechSynthesis = new SpeechSynthesisUtterance();

    Config.Speak = function(text) {
        
        speechSynthesis.text = text;
        window.speechSynthesis.speak(speechSynthesis);
    };

})();