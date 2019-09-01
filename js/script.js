(function IIFE() {

	//**** Global variables *****
	const assetPath = 'soundfiles/';
	const voiceArray = [];
	var isPlaying = null;

	//* fill sound array with all available voices
	function getAllVoices() {
		const voices = document.querySelectorAll('.playSound');
		voices.forEach(voice => {
			const voiceSound = {};
			const voiceID = voice.getAttribute('data-sound-id');
			voiceSound.src = `${voiceID}.mp3`;
			voiceSound.id = voiceID;
			voiceArray.push(voiceSound);
		});
	}

	//* creating sounds using create.js function
	function loadSounds() {
		createjs.Sound.registerSounds(voiceArray, assetPath, 1);
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
		fcbSixers.sort(() => 0.5 - Math.random());

		for (let person of fcbSixers) {
			const headShot = Mustache.render(template, person);
			const teamID = getTeamId();
			const member = isTeamMember(person.id, teamID);
			member ? headShotContainer.insertAdjacentHTML('afterbegin', headShot) : headShotContainer.insertAdjacentHTML('beforeend', headShot);
		}
	}

	function getTeamId() {
		const url = window.location.href;

		if (url.indexOf('?') === -1) {
			return false;
		} else {
			const team = url.split('?')[1].split('=')[1].split('&')[0];
			return team;
		}
	};

	function isTeamMember(id, teamId) {
		for (let team of fcbSixTeams) {
			if (team.hasOwnProperty(teamId)) {
				const isMember = team[teamId].indexOf(id);
				if (isMember !== -1) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	}

	function showHeadshotLabel() {
		const headshotContainer = document.getElementById('headshot-container');

		//show headshot label on hover
		headshotContainer.addEventListener('mouseover', e => {
			if (e.target.classList.contains('headshot')) {
				e.target.nextSibling.classList.add('show');
			}
		});
		//hide headshot label
		headshotContainer.addEventListener('mouseout', e => {
			if (e.target.classList.contains('headshot')) {
				e.target.nextSibling.classList.remove('show');
			}
		})

	}

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
		showHeadshotLabel();
	}

	$(document).ready(function() {
		init();
	});
})();