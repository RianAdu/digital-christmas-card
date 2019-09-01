(function IIFE() {

	//**** Global variables *****
	const assetPath = 'soundfiles/';
	const voicesArray = [];
	let isPlaying = null;

	//* fill sound array with all available voices
	function getAllVoices() {
		const Voices = document.querySelectorAll('.playSound');
		Voices.forEach(voice => {
			const voiceSound = {};
			const voiceID = voice.getAttribute('data-sound-id');
			voiceSound.src = `${voiceID}.mp3`;
			voiceSound.id = voiceID;
			voicesArray.push(voiceSound);
		});
	}

	//* creating sounds using create.js function
	function loadSounds() {
		createjs.Sound.registerSounds(voicesArray, assetPath, 1);
	};

	function playThisSound(soundToPlay) {
		if (isPlaying !== null) {
			isPlaying.stop();
		}
		//* create instance when playing sound to get access to stop() function. See Global variables
		isPlaying = createjs.Sound.play(soundToPlay);
	};

	//* Creating Headshot DOM elements
	function setHeadShots() {
		const headShotContainer = document.getElementById('headshot-container');
		namesArray.sort(() => 0.5 - Math.random());

		for (let person of namesArray) {
			const headShot = Mustache.render(template, person);
			const teamID = getTeamId();
			const member = isTeamMember(person.id, teamID);
			member ? headShotContainer.insertAdjacentHTML('afterbegin', headShot) : headShotContainer.insertAdjacentHTML('beforeend', headShot);
		}
	}

	function getTeamId() {
		var url = window.location.href;
		if (url.indexOf('?') === -1) {
			return false;
		} else {
			var tmp = url.split('?');
			var tmp2 = tmp[1].split('=');
			var team = tmp2[1].split('&');
			return team[0];
		}
	};

	function isTeamMember(id, teamId) {
		for (var x in teamObject) {
			var allTeams = teamObject[x];

			if (allTeams.hasOwnProperty(teamId)) {
				var isMember = $.inArray(id, allTeams[teamId]);

				if (isMember !== -1) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
				break;
			}
		}
	};

	function animateNameLabel() {
		$('.headshot').hover(function() {
				$(this).next().addClass('show');
			},
			function() {
				$(this).next().removeClass('show');
			});
	};

	/**** Adding EventListeners *****/
	function bindEvents() {

		$('.playSound').on('click', function() {
			var soundId = $(this).data('sound-id');
			playThisSound(soundId);
		});
	};

	function init() {
		setHeadShots();
		getAllVoices();
		loadSounds();
		bindEvents();
		animateNameLabel();
	}

	$(document).ready(function() {
		init();
	});
})();