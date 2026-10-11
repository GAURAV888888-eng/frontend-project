// Bollywood Songs Dataset with Reliable Audio Streams
const songs = [
  {
    title: "Kesariya",
    artist: "Arijit Singh, Pritam",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    title: "Tum Hi Ho",
    artist: "Arijit Singh, Mithoon",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60",
    src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=chill-abstract-intention-12099.mp3"
  },
  {
    title: "Raataan Lambiyan",
    artist: "Jubin Nautiyal, Asees Kaur",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60",
    src: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_8fa3023023.mp3?filename=electronic-future-beats-117997.mp3"
  },
  {
    title: "Chaleya",
    artist: "Arijit Singh, Anirudh",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60",
    src: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f7922d.mp3?filename=summer-walk-126431.mp3"
  }
];

// DOM Elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const playlistEl = document.getElementById('playlist');

let songIndex = 0;
let isPlaying = false;

// Initialize Song
function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  updatePlaylistHighlight();
}

function playSong() {
  isPlaying = true;
  playIcon.className = 'fas fa-pause';
  audio.play().catch(err => console.log("Playback error: ", err));
}

function pauseSong() {
  isPlaying = false;
  playIcon.className = 'fas fa-play';
  audio.pause();
}

// Toggle Play/Pause
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// Previous / Next Track
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Update Timeline Progress
audio.addEventListener('timeupdate', (e) => {
  const { duration, currentTime } = e.srcElement;
  if (isNaN(duration)) return;

  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Format Timestamps
  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Seek Timeline on Click
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Volume Control
volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

// Autoplay Next Track When Song Ends
audio.addEventListener('ended', nextSong);

// Render Playlist Items
function buildPlaylist() {
  playlistEl.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.innerText = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

function updatePlaylistHighlight() {
  const items = playlistEl.querySelectorAll('li');
  items.forEach((item, index) => {
    if (index === songIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Startup
buildPlaylist();
loadSong(songs[songIndex]);
audio.volume = volumeSlider.value;