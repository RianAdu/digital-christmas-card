$(function() {

	/**** Global variables *****/
	var assetPath = 'sound_files/';
	var sounds = [];
	var isPlaying = null;



	/**** Sound.js functions ****/
	function setSoundIDArray() {
		$('.playSound').each(function() {
			var id = $(this).attr('data-sound-id');
			var sound = {};
			sound.src = id + '.mp3';
			sound.id = id;
			sounds.push(sound);
		});
	};

	function loadSounds() {
		createjs.Sound.registerSounds(sounds, assetPath, 1);
	};

	function playThisSound(soundToPlay) {
		//var soundToPlay = $(this).attr('data-sound-id');

		if (isPlaying !== null) {
			isPlaying.stop();
		}
		//create instance when playing sound to get access to stop() function. See Global variables
		isPlaying = createjs.Sound.play(soundToPlay);
	};



	/**** Create DOM elements functions ****/
	function createDomElements() {
		var faceContainer = $('#face-container');
		names.sort(function() {
			return 0.5 - Math.random()
		});

		for (var i in names) {
			var person = names[i];
			var face = Mustache.render(template, person);
			var teamId = getTeamId();
			var member = isTeamMember(person.id, teamId);
			member ? faceContainer.prepend(face) : faceContainer.append(face);
		}
	};

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
		$('.face').hover(function() {
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
		createDomElements();
		setSoundIDArray();
		loadSounds();
		bindEvents();
		animateNameLabel();
	}

	$(document).ready(function() {
		init();
	});
});