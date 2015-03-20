(function () {

	var speechOutput = "";
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = false;
	recognition.lang = "en-GB";
	var modal = $("#myModal");

	var actions = {
		profile: "my profile",
		JobsByEmail: "jobs by e-mail"
	}

	function launchDialog() {
		modal.modal("show");
		speechOutput = "";
		$("#outputSpan").html("");
	}

	Config.SpeechRecognition.StartRecording = function () {
		launchDialog();
		recognition.start();
	};

	Config.SpeechRecognition.StopRecording = function () {
		recognition.stop();
	};

	function setResult(results) {
		if (results.length > 0) {
			var currentEvent = results[results.length - 1];
			speechOutput += currentEvent[0].transcript.toLowerCase();
		}
	};

	function speechResults() {
		$("#outputSpan").html(speechOutput);
	}

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

	recognition.onresult = function (event) {
		setResult(event.results);

		speechResults();

		if (speechOutput === actions.profile) {
			goToMyProfile();
		}
		else if (speechOutput === actions.JobsByEmail) {
			goToJobsByEmail();
		}
		else {
			search();
		}

		Config.SpeechRecognition.StopRecording();
		modal.modal("hide");

	};

	recognition.onerror = function (event) {
		console.log(event);
	};


})();
