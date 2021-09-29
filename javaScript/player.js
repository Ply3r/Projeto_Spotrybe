const createAudioElement = (link) => {
  const prevAudio = document.getElementById('playerMusic');
  const maxTimeSpan = document.querySelector('.player-max-time');
  if (prevAudio) prevAudio.remove();

  const audio = new Audio(link);
  audio.id = 'playerMusic';
  audio.addEventListener('loadeddata', () => {
    maxTimeSpan.innerText = `00:${parseInt(audio.duration)}`;
  });

  document.body.appendChild(audio);
};

const playerProgressHandler = (currentMusic) => {
  const currentTimeSpan = document.querySelector('.player-current-time');
  const progressBar = document.querySelector('.progress-bar');
  const currentTimeByMusic = parseInt(currentMusic.currentTime).toString().padStart(2, '0');

  currentTimeSpan.innerText = `00:${currentTimeByMusic}`;
  progressBar.ariaValueNow = currentTimeByMusic;
  progressBar.style.width = `${currentTimeByMusic * 3.3}%`;

  const plusOneSec = setInterval(async () => {
    if (!currentMusic.paused) {
      const currentTimeArr = currentTimeSpan.innerText.split('');
      if (currentTimeArr[4] === '9') {
        currentTimeArr[4] = 0;
        currentTimeArr[3] = Number(currentTimeArr[3]) + 1;
      } else {
        currentTimeArr[4] = Number(currentTimeArr[4]) + 1;
      }
      progressBar.ariaValueNow = Number(currentTimeArr.slice(-2).join('')) * 3.3;
      progressBar.style.width = `${Number(currentTimeArr.slice(-2).join('')) * 3.3}%`;
      currentTimeSpan.innerText = currentTimeArr.join('');
    }
  }, 1000);

  currentMusic.addEventListener('pause', () => {
    clearInterval(plusOneSec);
  });
};

const togglePlay = () => {
  const currentMusic = document.getElementById('playerMusic');

  if (currentMusic) {
    if (currentMusic.paused) {
      currentMusic.play();
      playBtn.classList.add('d-none');
      pauseBtn.classList.remove('d-none');
    } else {
      currentMusic.pause();
      playBtn.classList.remove('d-none');
      pauseBtn.classList.add('d-none');
    }

    playerProgressHandler(currentMusic);
  }
};

const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');

playBtn.addEventListener('click', togglePlay);
pauseBtn.addEventListener('click', togglePlay);

export { createAudioElement, playerProgressHandler, togglePlay };