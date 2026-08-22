// ===============================
// DOM
// ===============================

const audioPlayer =
  document.getElementById("audioPlayer");

const playPauseBtn =
  document.getElementById("playPauseBtn");

const previousBtn =
  document.getElementById("previousBtn");

const nextBtn =
  document.getElementById("nextBtn");

const progressBar =
  document.getElementById("progressBar");

const currentTimeElement =
  document.getElementById("currentTime");

const durationElement =
  document.getElementById("duration");

const volumeBar =
  document.getElementById("volumeBar");

const playerSongInfo =
  document.getElementById("playerSongInfo");

const trendingSongRow =
  document.getElementById("trendingSongRow");

const artistRow =
  document.getElementById("artistRow");

const albumRow =
  document.getElementById("albumRow");


// ===============================
// JAMENDO API
// ===============================

const JAMENDO_CLIENT_ID = "eaa3a634";

const JAMENDO_API =
  "https://api.jamendo.com/v3.0/tracks/";


// ===============================
// STATE
// ===============================

let songs = [];

let currentSongIndex = -1;


// ===============================
// FETCH MUSIC
// ===============================

async function fetchMusic() {

  try {

    trendingSongRow.innerHTML =
      "<p>Loading songs...</p>";

    artistRow.innerHTML =
      "<p>Loading artists...</p>";

    albumRow.innerHTML =
      "<p>Loading albums...</p>";


    const url =
      `${JAMENDO_API}` +
      `?client_id=${JAMENDO_CLIENT_ID}` +
      `&format=json` +
      `&limit=30` +
      `&audioformat=mp32` +
      `&order=popularity_total`;


    const response =
      await fetch(url);


    if (!response.ok) {

      throw new Error(
        `HTTP Error: ${response.status}`
      );

    }


    const data =
      await response.json();


    songs =
      data.results || [];


    renderSongs();

    renderArtists();

    renderAlbums();

  } catch (error) {

    console.error(
      "API Error:",
      error
    );


    trendingSongRow.innerHTML =
      "<p>Unable to load songs.</p>";

    artistRow.innerHTML =
      "<p>Unable to load artists.</p>";

    albumRow.innerHTML =
      "<p>Unable to load albums.</p>";

  }

}


// ===============================
// RENDER SONGS
// ===============================

function renderSongs() {

  trendingSongRow.innerHTML = "";


  songs
    .slice(0, 10)
    .forEach(function (song, index) {

      const card =
        document.createElement("article");


      card.className =
        "song-card";


      card.innerHTML = `

        <div class="song-image-wrapper">

          <img
            src="${song.image}"
            alt="${song.name}"
            class="song-image"
          >

          <button
            class="card-play-btn"
            type="button"
          >
            <i class="bi bi-play-fill"></i>
          </button>

        </div>

        <h3>
          ${song.name}
        </h3>

        <p>
          ${song.artist_name}
        </p>

      `;


      card.addEventListener(
        "click",
        function () {

          playSong(index);

        }
      );


      trendingSongRow.appendChild(
        card
      );

    });

}


// ===============================
// RENDER ARTISTS
// ===============================

function renderArtists() {

  artistRow.innerHTML = "";


  const artists = [];


  songs.forEach(function (song) {

    const exists =
      artists.some(
        function (artist) {

          return (
            artist.name ===
            song.artist_name
          );

        }
      );


    if (!exists) {

      artists.push({

        name:
          song.artist_name,

        image:
          song.image

      });

    }

  });


  artists
    .slice(0, 10)
    .forEach(function (artist) {

      const card =
        document.createElement("article");


      card.className =
        "artist-card";


      card.innerHTML = `

        <img
          src="${artist.image}"
          alt="${artist.name}"
          class="artist-image"
        >

        <h3>
          ${artist.name}
        </h3>

        <p>
          Artist
        </p>

      `;


      artistRow.appendChild(
        card
      );

    });

}


// ===============================
// RENDER ALBUMS
// ===============================

function renderAlbums() {

  albumRow.innerHTML = "";


  const albums = [];


  songs.forEach(function (song) {

    if (!song.album_name) {
      return;
    }


    const exists =
      albums.some(
        function (album) {

          return (
            album.name ===
            song.album_name
          );

        }
      );


    if (!exists) {

      albums.push({

        name:
          song.album_name,

        artist:
          song.artist_name,

        image:
          song.album_image ||
          song.image

      });

    }

  });


  albums
    .slice(0, 10)
    .forEach(function (album) {

      const card =
        document.createElement("article");


      card.className =
        "song-card";


      card.innerHTML = `

        <div class="song-image-wrapper">

          <img
            src="${album.image}"
            alt="${album.name}"
            class="song-image"
          >

        </div>

        <h3>
          ${album.name}
        </h3>

        <p>
          ${album.artist}
        </p>

      `;


      albumRow.appendChild(
        card
      );

    });

}


// ===============================
// PLAY SONG
// ===============================

function playSong(index) {

  if (!songs[index]) {
    return;
  }


  currentSongIndex =
    index;


  const song =
    songs[currentSongIndex];


  playerSongInfo.innerHTML = `

    <img
      src="${song.image}"
      alt="${song.name}"
      class="player-song-image"
    >

    <div class="player-song-text">

      <h4>
        ${song.name}
      </h4>

      <p>
        ${song.artist_name}
      </p>

    </div>

  `;


  audioPlayer.src =
    song.audio;


  progressBar.value = 0;

  currentTimeElement.textContent =
    "0:00";

  durationElement.textContent =
    "0:00";


  audioPlayer
    .play()
    .catch(function (error) {

      console.error(
        "Playback Error:",
        error
      );

    });

}


// ===============================
// PLAY / PAUSE
// ===============================

function togglePlayPause() {

  if (currentSongIndex === -1) {

    if (songs.length > 0) {

      playSong(0);

    }

    return;

  }


  if (audioPlayer.paused) {

    audioPlayer.play();

  } else {

    audioPlayer.pause();

  }

}


playPauseBtn.addEventListener(
  "click",
  togglePlayPause
);


// ===============================
// PLAY ICON
// ===============================

audioPlayer.addEventListener(
  "play",
  function () {

    playPauseBtn.innerHTML =
      '<i class="bi bi-pause-fill"></i>';

  }
);


audioPlayer.addEventListener(
  "pause",
  function () {

    playPauseBtn.innerHTML =
      '<i class="bi bi-play-fill"></i>';

  }
);


// ===============================
// NEXT
// ===============================

function playNextSong() {

  if (songs.length === 0) {
    return;
  }


  if (currentSongIndex === -1) {

    playSong(0);

    return;

  }


  currentSongIndex++;


  if (
    currentSongIndex >=
    songs.length
  ) {

    currentSongIndex = 0;

  }


  playSong(
    currentSongIndex
  );

}


nextBtn.addEventListener(
  "click",
  playNextSong
);


// ===============================
// PREVIOUS
// ===============================

function playPreviousSong() {

  if (songs.length === 0) {
    return;
  }


  if (currentSongIndex === -1) {

    playSong(0);

    return;

  }


  currentSongIndex--;


  if (
    currentSongIndex < 0
  ) {

    currentSongIndex =
      songs.length - 1;

  }


  playSong(
    currentSongIndex
  );

}


previousBtn.addEventListener(
  "click",
  playPreviousSong
);


// ===============================
// FORMAT TIME
// ===============================

function formatTime(seconds) {

  if (
    !Number.isFinite(seconds)
  ) {

    return "0:00";

  }


  const minutes =
    Math.floor(
      seconds / 60
    );


  const remainingSeconds =
    Math.floor(
      seconds % 60
    )
      .toString()
      .padStart(
        2,
        "0"
      );


  return (
    `${minutes}:${remainingSeconds}`
  );

}


// ===============================
// DURATION
// ===============================

audioPlayer.addEventListener(
  "loadedmetadata",
  function () {

    durationElement.textContent =
      formatTime(
        audioPlayer.duration
      );

  }
);


// ===============================
// PROGRESS UPDATE
// ===============================

audioPlayer.addEventListener(
  "timeupdate",
  function () {

    if (
      !Number.isFinite(
        audioPlayer.duration
      )
    ) {

      return;

    }


    const progress =
      (
        audioPlayer.currentTime /
        audioPlayer.duration
      ) * 100;


    progressBar.value =
      progress;


    currentTimeElement.textContent =
      formatTime(
        audioPlayer.currentTime
      );


    durationElement.textContent =
      formatTime(
        audioPlayer.duration
      );

  }
);


// ===============================
// SEEK
// ===============================

progressBar.addEventListener(
  "input",
  function () {

    if (
      !Number.isFinite(
        audioPlayer.duration
      )
    ) {

      return;

    }


    const percentage =
      Number(
        progressBar.value
      );


    audioPlayer.currentTime =
      (
        percentage / 100
      ) *
      audioPlayer.duration;

  }
);


// ===============================
// VOLUME
// ===============================

audioPlayer.volume =
  Number(
    volumeBar.value
  );


volumeBar.addEventListener(
  "input",
  function () {

    audioPlayer.volume =
      Number(
        volumeBar.value
      );

  }
);


// ===============================
// AUTO NEXT
// ===============================

audioPlayer.addEventListener(
  "ended",
  playNextSong
);


// ===============================
// START
// ===============================

fetchMusic();