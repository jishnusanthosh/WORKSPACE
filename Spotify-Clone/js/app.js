// ======================================================
// DOM ELEMENTS
// ======================================================

const audioPlayer = document.getElementById("audioPlayer");

const playPauseBtn =
  document.getElementById("playPauseBtn");

const progressBar =
  document.getElementById("progressBar");

const currentTimeElement =
  document.getElementById("currentTime");

const durationElement =
  document.getElementById("duration");

const volumeBar =
  document.getElementById("volumeBar");

const nextBtn =
  document.getElementById("nextBtn");

const previousBtn =
  document.getElementById("previousBtn");

const currentSongTitle =
  document.getElementById("currentSongTitle");

const currentSongArtist =
  document.getElementById("currentSongArtist");

const currentSongImage =
  document.getElementById("currentSongImage");

const trendingSongRow =
  document.getElementById("trendingSongRow");

const artistRow =
  document.getElementById("artistRow");

const albumRow =
  document.getElementById("albumRow");


// ======================================================
// JAMENDO API
// ======================================================

const JAMENDO_CLIENT_ID = "eaa3a634";

const JAMENDO_API =
  "https://api.jamendo.com/v3.0/tracks/";


// ======================================================
// APPLICATION STATE
// ======================================================

let songs = [];

let currentSongIndex = 0;


// ======================================================
// FETCH DATA
// ======================================================

async function fetchMusic() {
  try {
    trendingSongRow.innerHTML = `
      <p class="text-secondary">
        Loading songs...
      </p>
    `;

    artistRow.innerHTML = `
      <p class="text-secondary">
        Loading artists...
      </p>
    `;

    albumRow.innerHTML = `
      <p class="text-secondary">
        Loading albums...
      </p>
    `;


    const apiURL =
      `${JAMENDO_API}?client_id=${JAMENDO_CLIENT_ID}` +
      `&format=json` +
      `&limit=30` +
      `&audioformat=mp32` +
      `&order=popularity_total`;


    const response = await fetch(apiURL);


    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status}`
      );
    }


    const data = await response.json();


    if (!data.results) {
      throw new Error(
        "No music data received."
      );
    }


    songs = data.results;


    renderSongs();

    renderArtists();

    renderAlbums();

  } catch (error) {
    console.error(
      "Jamendo API Error:",
      error
    );


    trendingSongRow.innerHTML = `
      <p class="text-danger">
        Unable to load songs.
      </p>
    `;


    artistRow.innerHTML = `
      <p class="text-danger">
        Unable to load artists.
      </p>
    `;


    albumRow.innerHTML = `
      <p class="text-danger">
        Unable to load albums.
      </p>
    `;
  }
}


// ======================================================
// RENDER TRENDING SONGS
// ======================================================

function renderSongs() {
  trendingSongRow.innerHTML = "";


  songs.slice(0, 10).forEach(
    function (song, index) {

      const songCard =
        document.createElement("article");


      songCard.classList.add(
        "song-card"
      );


      songCard.innerHTML = `
        <div class="song-image-wrapper">

          <img
            src="${song.image}"
            alt="${song.name}"
            class="song-image"
          />

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


      songCard.addEventListener(
        "click",
        function () {

          playSong(index);

        }
      );


      trendingSongRow.appendChild(
        songCard
      );
    }
  );
}


// ======================================================
// RENDER ARTISTS
// ======================================================

function renderArtists() {
  artistRow.innerHTML = "";


  const uniqueArtists = [];


  songs.forEach(function (song) {

    const alreadyExists =
      uniqueArtists.some(
        function (artist) {

          return (
            artist.name ===
            song.artist_name
          );

        }
      );


    if (!alreadyExists) {

      uniqueArtists.push({
        name: song.artist_name,
        image: song.image
      });

    }

  });


  uniqueArtists
    .slice(0, 10)
    .forEach(function (artist) {

      const artistCard =
        document.createElement("article");


      artistCard.classList.add(
        "artist-card"
      );


      artistCard.innerHTML = `
        <img
          src="${artist.image}"
          alt="${artist.name}"
          class="artist-image"
        />

        <h3>
          ${artist.name}
        </h3>

        <p>
          Artist
        </p>
      `;


      artistRow.appendChild(
        artistCard
      );

    });
}


// ======================================================
// RENDER ALBUMS
// ======================================================

function renderAlbums() {
  albumRow.innerHTML = "";


  const uniqueAlbums = [];


  songs.forEach(function (song) {

    if (!song.album_name) {
      return;
    }


    const alreadyExists =
      uniqueAlbums.some(
        function (album) {

          return (
            album.name ===
            song.album_name
          );

        }
      );


    if (!alreadyExists) {

      uniqueAlbums.push({
        name: song.album_name,
        artist: song.artist_name,
        image: song.album_image || song.image
      });

    }

  });


  uniqueAlbums
    .slice(0, 10)
    .forEach(function (album) {

      const albumCard =
        document.createElement("article");


      albumCard.classList.add(
        "song-card"
      );


      albumCard.innerHTML = `
        <div class="song-image-wrapper">

          <img
            src="${album.image}"
            alt="${album.name}"
            class="song-image"
          />

        </div>

        <h3>
          ${album.name}
        </h3>

        <p>
          ${album.artist}
        </p>
      `;


      albumRow.appendChild(
        albumCard
      );

    });
}


// ======================================================
// PLAY SONG
// ======================================================

function playSong(index) {

  if (!songs[index]) {
    return;
  }


  currentSongIndex = index;


  const song =
    songs[currentSongIndex];


  audioPlayer.src =
    song.audio;


  currentSongTitle.textContent =
    song.name;


  currentSongArtist.textContent =
    song.artist_name;


  currentSongImage.src =
    song.image;


  progressBar.value = 0;


  currentTimeElement.textContent =
    "0:00";


  audioPlayer
    .play()
    .catch(function (error) {

      console.error(
        "Playback error:",
        error
      );

    });
}


// ======================================================
// PLAY / PAUSE
// ======================================================

function togglePlayPause() {

  if (!audioPlayer.src) {

    if (songs.length > 0) {

      playSong(
        currentSongIndex
      );

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


// ======================================================
// PLAY / PAUSE ICON
// ======================================================

function updatePlayPauseIcon() {

  if (audioPlayer.paused) {

    playPauseBtn.innerHTML =
      '<i class="bi bi-play-fill"></i>';

  } else {

    playPauseBtn.innerHTML =
      '<i class="bi bi-pause-fill"></i>';

  }
}


audioPlayer.addEventListener(
  "play",
  updatePlayPauseIcon
);


audioPlayer.addEventListener(
  "pause",
  updatePlayPauseIcon
);


// ======================================================
// NEXT SONG
// ======================================================

function playNextSong() {

  if (songs.length === 0) {
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


// ======================================================
// PREVIOUS SONG
// ======================================================

function playPreviousSong() {

  if (songs.length === 0) {
    return;
  }


  currentSongIndex--;


  if (currentSongIndex < 0) {

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


// ======================================================
// FORMAT TIME
// ======================================================

function formatTime(seconds) {

  if (!Number.isFinite(seconds)) {

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


// ======================================================
// SONG DURATION
// ======================================================

audioPlayer.addEventListener(
  "loadedmetadata",
  function () {

    durationElement.textContent =
      formatTime(
        audioPlayer.duration
      );

  }
);


// ======================================================
// PROGRESS
// ======================================================

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
      ) *
      100;


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


// ======================================================
// SEEK
// ======================================================

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


    audioPlayer.currentTime =
      (
        Number(
          progressBar.value
        ) /
        100
      ) *
      audioPlayer.duration;

  }
);


// ======================================================
// VOLUME
// ======================================================

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


// ======================================================
// AUTO NEXT
// ======================================================

audioPlayer.addEventListener(
  "ended",
  playNextSong
);


// ======================================================
// START
// ======================================================

fetchMusic();