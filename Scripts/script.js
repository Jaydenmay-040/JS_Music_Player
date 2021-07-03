let artist_name = document.querySelector(".artist-name");
let track_name = document.querySelector(".track-name");

let playpause_btn = document.querySelector(".play");
let next_btn = document.querySelector(".next");
let prev_btn = document.querySelector(".prev");

let seek_slider = document.querySelector(".seek-slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".time-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
 
// Create the audio element for the player
let curr_track = document.createElement('audio');
 
// Define the list of tracks that have to be played
let track_list = [
    {
        title: "Not So Bad",
        artist: "Yves V & Ilkay Sencan",
        cover: "https://8list.ph/wp-content/uploads/2016/10/BASKETBALLTERMS_HEADER.jpg",
        audioFile: "Yves V & Ilkay Sencan Not So Bad (feat. Emie) [Official Lyric Video].mp3",
        color: "#c3af50"
    },
    {
        title: "Carry Me Home",
        artist: "Jorja Smith, Maverick Sabre",
        cover: "https://8list.ph/wp-content/uploads/2016/10/BASKETBALLTERMS_HEADER.jpg",
        audioFile: "Jorja Smith - Carry Me Home Feat. Maverick Sabre.mp3",
        color: "#25323b"
    },
    {
        title: "Until Morning",
        artist: "James Vickery",
        cover: "https://8list.ph/wp-content/uploads/2016/10/BASKETBALLTERMS_HEADER.jpg",
        audioFile: "James Vickery- Until Morning(LyricsLyric Video).mp3",
        color: "#c1c1c1"
    },
    {
        title: "To Build a Home",
        artist: "The Cinematic Orchestra",
        cover: "https://8list.ph/wp-content/uploads/2016/10/BASKETBALLTERMS_HEADER.jpg",
        audioFile: "To Build a Home - The Cinematic Orchestra (Lyrics).mp3",
        color: "#cd4829"
    },
    {
        title: "Coming Home",
        artist: "Leon Bridges",
        cover: "https://8list.ph/wp-content/uploads/2016/10/BASKETBALLTERMS_HEADER.jpg",
        audioFile: "Leon Bridges - Coming Home.mp3",
        color: "#5d0126"
    }
];


// function random_bg_color() {

//     // Get a number between 64 to 256 (for getting lighter colors)
//     let red = Math.floor(Math.random() * 256) + 64;
//     let green = Math.floor(Math.random() * 256) + 64;
//     let blue = Math.floor(Math.random() * 256) + 64;
  
//     // Construct a color withe the given values
//     let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  
//     // Set the background to that color
//     document.body.style.background = bgColor;
//   }
  
  function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = track_list[track_index].audioFile;
    curr_track.load();
  
    artist_name.textContent = track_list[track_index].artist;
    track_name.textContent = track_list[track_index].title;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
    // random_bg_color();
  }
  
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }
  
  // Load the first track in the tracklist
  loadTrack(track_index);
  
  function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
  
  function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
  
  function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
  }
  
  function nextTrack() {
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
  }
  
  function prevTrack() {
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
    playTrack();
  }
  
  function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
  }

  
  function seekUpdate() {
    let seekPosition = 0;
  
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
  
      seek_slider.value = seekPosition;
  
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
  
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }
  