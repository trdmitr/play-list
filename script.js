const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

//Музыка 
const songs = [
    {
        name: 'толян',
        displayName: 'Igra',
        artist: 'Толян'
    },
    {
        name: 'колян',
        displayName: 'Атаман',
        artist: 'Колян'
    },
    {
        name: 'медведь',
        displayName: 'Нам с тобой',
        artist: 'Медведь',
    },
    {
        name: 'костик',
        displayName: 'Около семи утра',
        artist: 'Костик',
      },
];

//проверка play
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play pauser Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
 // вывод в DOM
 function loadSong(song) {
     title.textContent = song.displayName;
     artist.textContent = song.artist;
     music.src = `music/${song.displayName}.mp3`;
     image.src = `img/${song.name}.jpg`;
 }
  // текущая песня
 let songIndex = 0;
//prev song
 function prevSong() {
     songIndex--;
     if (songIndex < 0) {
         songIndex = songs.length - 1;
     }
    //  console.log(songIndex)
     loadSong(songs[songIndex]);
     playSong();
 }
//next song

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    //console.log(songIndex)
    loadSong(songs[songIndex]);
    playSong();

}
 // Выбор пестни
 loadSong(songs[songIndex]);

 function updateProgressBar(e) {
     if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
         
         const progressPercent = (currentTime / duration) * 100;
         progress.style.width = `${progressPercent}%`;

         const durationMinutes = Math.floor(duration / 60);
        //  console.log ('minut: ', durationMinutes);
         let durationSeconds = Math.floor(duration % 60);
         if (durationSeconds < 10) {
             durationSeconds = `0${durationSeconds}`;
         }
        //  console.log('second: ', durationSeconds);
         
         if (durationSeconds) {
           durationEl.textContent = `${durationMinutes}:${durationSeconds}`; 
         }
        //ddD
        const currentMinutes = Math.floor(currentTime / 60);
        // console.log ('minut: ', currentMinutes);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        // console.log('second: ', currentSeconds);
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
     }
 }

function setProgressBar(e) {
    // console.log(e)
    const width = this.clientWidth;
    // console.log('width - ', width);
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
