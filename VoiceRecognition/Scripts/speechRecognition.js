(function () {

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

	function getResult(results) {
		var speechOutput = "";
		if (results.length > 0) {
			var currentEvent = results[results.length - 1];
			speechOutput = currentEvent[0].transcript.toLowerCase();

			resultSpan.innerHTML = speechOutput;
		}
		return speechOutput;
	};

	function search(keywords, location) {
		window.open("http://www.totaljobs.com/JobSearch/Results.aspx?Keywords=" + encodeURI(keywords) + "&LTxt=" + encodeURI(location));
	}

	function goToMyProfile() {
		window.open("http://www.totaljobs.com/Authenticated/Default.aspx");
	}

	function goToJobsByEmail() {
		window.open("http://www.totaljobs.com/JobSearch/JobsByEmailSetup.aspx");
	}

	function parseKeywords(speechOutput) {
		if (speechOutput.length > 0) {

			var keywords = "";
			var location = "";
			if (speechOutput.indexOf("keyword") > 0 || speechOutput.indexOf("location") > 0) {
				var splittedOutted = speechOutput.split(" ");
				var type = "";
				for (var i = 0; i < splittedOutted.length; i++) {
					var word = splittedOutted[i];

					if (word === "location") {
						type = "location";
						continue;
					}

					if (word === "keyword") {
						type = "keyword";
						continue;
					}

					if (type === "location") {
						location += " " + word;
					}

					if (type === "keyword" || type === "") {
						keywords += " " + word;
					}
				}

			} else {
				keywords = speechOutput;
			}

			search(keywords, location);
		}
	}

	function handleResult(speechOutput) {
		if (speechOutput === actions.profile) {
			goToMyProfile();
		}
		else if (speechOutput === actions.JobsByEmail) {
			goToJobsByEmail();
		}
		else {
			parseKeywords(speechOutput);
		}
	}

	recognition.onresult = function (event) {
		var speechOutput = getResult(event.results);

		handleResult(speechOutput);

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
