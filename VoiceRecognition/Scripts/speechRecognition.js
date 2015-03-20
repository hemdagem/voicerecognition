(function () {

	var speechOutput = "";
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = false;
	recognition.lang = "en-GB";
	var recordingIcon = document.getElementsByClassName("recording-icon")[0];
	var resultSpan = document.getElementById("speechSearchResult");

	var actions = {
		profile: "my profile",
		JobsByEmail: "jobs by e-mail"
	}

	Config.SpeechRecognition.StartRecording = function () {
		recognition.start();
		recordingIcon.style.display = "block";
	};

	Config.SpeechRecognition.StopRecording = function () {
		recognition.stop();
	};

	function setResult(results) {
		if (results.length > 0) {
			var currentEvent = results[results.length - 1];
			speechOutput += currentEvent[0].transcript.toLowerCase();
			resultSpan.innerHTML = speechOutput;
		}
	};

	function search() {
		if (speechOutput.length > 0) {
			var keywords = encodeURI(speechOutput);
			window.open("http://www.totaljobs.com/JobSearch/Results.aspx?Keywords=" + keywords);
		}
	}

	function goToMyProfile() {
		window.open("http://www.totaljobs.com/Authenticated/Default.aspx");
	}

	function goToJobsByEmail() {
		window.open("http://www.totaljobs.com/JobSearch/JobsByEmailSetup.aspx");
	}

	function handleResult() {
		if (speechOutput === actions.profile) {
			goToMyProfile();
		}
		else if (speechOutput === actions.JobsByEmail) {
			goToJobsByEmail();
		}
		else {
			search();
		}
	}

	recognition.onresult = function (event) {
		setResult(event.results);

		handleResult();

		Config.SpeechRecognition.StopRecording();
	};

	recognition.onerror = function (event) {
		resultSpan.innerHTML = event.error;
	};

	recognition.onend = function () {
		recordingIcon.style.display = "none";
	}

	recognition.onnomatch = function () {
		resultSpan.innerHTML = "No match found. Please try again";
	}

})();
