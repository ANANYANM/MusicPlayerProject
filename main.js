let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let track_index =localStorage.getItem('selectedTrackIndex') ? parseInt(localStorage.getItem('selectedTrackIndex')) : 0;
let isPlaying = false;
let updateTimer;
// Create new audio element
let curr_track = document.createElement('audio');
// Define the tracks that have to be played
let track_list = [
  {
    name: "Onde Usirante",
    artist: "RajeshKrishan",
    image: "https://images.pexels.com/photos/1762578/pexels-photo-1762578.jpeg?auto=compress&cs=tinysrgb&w=400",
    path: "https://aac.saavncdn.com/590/1edac9a3d23f042460544e4147ef2cc1_160.mp4",
  },
  {
    name: "Yenagali Munde Saagunee",
    artist: "Sonu Nigam",
    image: "https://images.pexels.com/photos/306175/pexels-photo-306175.jpeg?auto=compress&cs=tinysrgb&w=400",
    path: "https://aac.saavncdn.com/983/159bfd236d96a98d3350533bc8303aac_160.mp4",
  },{
    name: "Nine Rajakumara ",
    artist: "Vijay Prakash",
    image: "https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=400",
    path: "https://aac.saavncdn.com/964/2665c9cfd2c22ace986f9dc6bd28491d_160.mp4",
  },{
    name: "Neee Nanage Allava ",
    artist: "Sanjith Hegde",
    image: "https://images.pexels.com/photos/4088784/pexels-photo-4088784.jpeg?auto=compress&cs=tinysrgb&w=400",
    path: "https://aac.saavncdn.com/534/61a3a57afd31ba91cddf3bcd9a0074df_160.mp4",
  },{
    name: "NaadaMaya Ee Loka",
    artist: "Dr Rajkumar",
    image: "https://images.pexels.com/photos/3120109/pexels-photo-3120109.jpeg?auto=compress&cs=tinysrgb&w=400",
    path: "https://aac.saavncdn.com/877/462cf7fe5725248f1f57628253fe54c7_160.mp4",
  },
  {
    name: "Kaagada da Doniyali",
    artist: "Vasuki Vaibhav",
    image: "https://images.pexels.com/photos/8038906/pexels-photo-8038906.jpeg?auto=compress&cs=tinysrgb&w=400",
    path: "https://aac.saavncdn.com/126/9f37594703713ead19470e67999d18e1_160.mp4",
  },
  {
    name: "Naguva Nayana",
    artist: "S B Balasubramanyam",
    image: "https://images.pexels.com/photos/210854/pexels-photo-210854.jpeg?auto=compress&cs=tinysrgb&w=400",
    path: "https://aac.saavncdn.com/685/ebdb3dbfe880519b6e79008aa0115f26_sar_160.mp4"
  },
  {
    name: "Sinagaara Siriye",
    artist: "Vijay Prakash, Ananya Bhatt",
    image: "https://images.pexels.com/photos/752535/pexels-photo-752535.jpeg?auto=compress&cs=tinysrgb&w=400",
    path: "https://aac.saavncdn.com/999/fabd019b30838e32a477d7c801c529a5_160.mp4"
  },
  {
    name: "Lokada Kaalaji",
    artist: "Raghu Dixit",
    image: "https://images.pexels.com/photos/164697/pexels-photo-164697.jpeg?auto=compress&cs=tinysrgb&w=400",
    path: "https://aac.saavncdn.com/041/f1a0934237506572b5a98e7ff6db53b5_160.mp4"
  },
  {
    name: "Madhura Pisu Maatige",
    artist: "Arjun Janya",
    image: "https://images.pexels.com/photos/7267485/pexels-photo-7267485.jpeg?auto=compress&cs=tinysrgb&w=400",
    path: "https://aac.saavncdn.com/447/bc84ffff130eae54a9d906d29f70a9ae_160.mp4",
  },
];
function random_bg_color() {
  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
 let blue = Math.floor(Math.random() * 256) + 64;
  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  // Set the background to that color
  document.body.style.background = bgColor;
}
function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
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
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
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
function downloadTrack() {
  const currentTrack = track_list[track_index]; // Get the current track
  const link = document.createElement('a'); // Create a link element
  link.href = currentTrack.path; // Set the download link to the track path
  link.download = currentTrack.name + ".mp3"; // Set the download attribute with a default file name
  document.body.appendChild(link); // Append the link to the body
  link.click(); // Programmatically click the link to trigger the download
  document.body.removeChild(link); // Remove the link after the download
}
