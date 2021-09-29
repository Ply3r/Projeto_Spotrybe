const addDuration = (duration) => {
  const maxTimeSpan = document.querySelector('.player-max-time');

  maxTimeSpan.innerText = `00:${duration}`;
};

const createAudioElement = (link) => {
  const prevAudio = document.getElementById('playerMusic');
  if (prevAudio) prevAudio.remove();

  const audio = new Audio(link);
  audio.id = 'playerMusic';
  audio.addEventListener('loadeddata', () => {
    addDuration(parseInt(audio.duration));

    const progressDiv = document.querySelector('.progress');
    progressDiv.removeEventListener('mouseover');
    progressDiv.removeEventListener('mouseout');
    progressDiv.addEventListener('mouseover', () => createProgressBall());
    progressDiv.addEventListener('mouseout', () => removeProgressBall());
  });
  document.body.appendChild(audio);
};

const createProgressBall = () => {
  const ball = document.createElement('i');
  const progressDiv = document.querySelector('.progress')
  ball.className = 'fas fa-circle';
  ball.style.color = 'white';

  progressDiv.appendChild(ball);
}

const removeProgressBall = () => {
  const ball = document.querySelector('.fa-circle');
  ball.remove();
}

const getCurrentTime = (music) => parseInt(music.currentTime).toString().padStart(2, '0');

const getCurrentTimeFloat = (music) => music.currentTime;

const handleProgressBar = (time) => {
  const progressBar = document.querySelector('.progress-bar');

  progressBar.ariaValueNow = time;
  progressBar.style.width = `${time * (100 / 30)}%`;
};

const handlePlayButton = (isPlaying) => {
  if (isPlaying) {
    playBtn.classList.add('d-none');
    pauseBtn.classList.remove('d-none');
  } else {
    playBtn.classList.remove('d-none');
    pauseBtn.classList.add('d-none');
  }
};

const playerProgressHandler = (currentMusic) => {
  const currentTimeSpan = document.querySelector('.player-current-time');
  const currentTimeByMusic = getCurrentTime(currentMusic);

  currentTimeSpan.innerText = `00:${currentTimeByMusic}`;
  handleProgressBar(getCurrentTimeFloat(currentMusic));

  const plusOneSec = setInterval(() => {
    const currentTimeArr = currentTimeSpan.innerText.split('');
    if (currentTimeArr[4] === '9') {
      currentTimeArr[4] = 0;
      currentTimeArr[3] = Number(currentTimeArr[3]) + 1;
    } else {
      currentTimeArr[4] = Number(currentTimeArr[4]) + 1;
    }
    currentTimeSpan.innerText = currentTimeArr.join('');
  }, 1000);

  const plusFiftyMSec = setInterval(() => {
    handleProgressBar(getCurrentTimeFloat(currentMusic));
  }, 50);

  currentMusic.addEventListener('pause', () => {
    clearInterval(plusOneSec);
    clearInterval(plusFiftyMSec);

    if (currentMusic.ended) handlePlayButton(false);
  });
};

const togglePlay = () => {
  const currentMusic = document.getElementById('playerMusic');

  if (currentMusic) {
    if (currentMusic.paused) {
      currentMusic.play();
      handlePlayButton(true);
      playerProgressHandler(currentMusic);
    } else {
      currentMusic.pause();
      handlePlayButton(false);
    }
  }
};

const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');

playBtn.addEventListener('click', togglePlay);
pauseBtn.addEventListener('click', togglePlay);

export { createAudioElement, playerProgressHandler, togglePlay };