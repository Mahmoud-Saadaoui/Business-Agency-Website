/**
 * Video Player Module
 * Handles custom video player controls
 */

export class VideoPlayer {
  constructor() {
    // DOM Elements
    this.videoWrapper = document.querySelector('.about__video-wrapper');
    this.video = document.querySelector('.about__video');
    this.playPauseBtn = document.querySelector('.video-controls__btn--play');
    this.volumeBtn = document.querySelector('.video-controls__btn--volume');
    this.volumeSlider = document.querySelector('.video-controls__volume-slider');
    this.progressBar = document.querySelector('.video-progress__input');
    this.timeTooltip = document.querySelector('.video-progress__tooltip');
    this.videoControls = document.querySelector('.about__video-controls');

    // State
    this.isPlaying = false;
    this.isMuted = false;
    this.previousVolume = 1;
    this.controlsTimeout = null;

    // Bind methods
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleProgressHover = this.handleProgressHover.bind(this);
    this.showControls = this.showControls.bind(this);
    this.hideControls = this.hideControls.bind(this);

    // Initialize
    this.init();
  }

  init() {
    if (!this.video) {
      console.warn('Video element not found');
      return;
    }

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Play/Pause controls
    this.playPauseBtn?.addEventListener('click', this.togglePlayPause);
    this.video?.addEventListener('click', this.togglePlayPause);

    // Volume controls
    this.volumeBtn?.addEventListener('click', this.toggleVolume);
    this.volumeSlider?.addEventListener('input', this.handleVolumeChange);

    // Progress bar
    this.video?.addEventListener('timeupdate', this.handleTimeUpdate);
    this.progressBar?.addEventListener('input', this.handleSeek);
    this.progressBar?.addEventListener('mousemove', this.handleProgressHover);
    this.progressBar?.addEventListener('mouseout', () => {
      this.timeTooltip.style.display = 'none';
    });

    // Video controls visibility
    this.videoWrapper?.addEventListener('mousemove', this.showControls);
    this.videoWrapper?.addEventListener('mouseleave', this.hideControls);

    // Update play/pause button when video state changes
    this.video?.addEventListener('play', () => this.updatePlayPauseButton(true));
    this.video?.addEventListener('pause', () => this.updatePlayPauseButton(false));
    this.video?.addEventListener('ended', () => {
      this.isPlaying = false;
      this.updatePlayPauseButton(false);
    });
  }

  togglePlayPause() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  updatePlayPauseButton(isPlaying) {
    const icon = this.playPauseBtn?.querySelector('i');
    if (!icon) return;

    if (isPlaying) {
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
      this.playPauseBtn.setAttribute('aria-label', 'Pause video');
    } else {
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
      this.playPauseBtn.setAttribute('aria-label', 'Play video');
    }
  }

  toggleVolume() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.previousVolume = this.video.volume;
      this.video.volume = 0;
      this.volumeSlider.value = 0;
      this.updateVolumeIcon(0);
      this.volumeBtn?.setAttribute('aria-label', 'Unmute');
    } else {
      this.video.volume = this.previousVolume;
      this.volumeSlider.value = this.previousVolume;
      this.updateVolumeIcon(this.previousVolume);
      this.volumeBtn?.setAttribute('aria-label', 'Mute');
    }

    // Update data attribute
    this.volumeBtn?.setAttribute('data-muted', this.isMuted.toString());
  }

  handleVolumeChange() {
    const volume = parseFloat(this.volumeSlider.value);
    this.video.volume = volume;
    this.updateVolumeIcon(volume);

    // Update muted state
    this.isMuted = volume === 0;
    this.volumeBtn?.setAttribute('data-muted', this.isMuted.toString());
  }

  updateVolumeIcon(volume) {
    const icon = this.volumeBtn?.querySelector('i');
    if (!icon) return;

    icon.classList.remove('fa-volume-xmark', 'fa-volume-low', 'fa-volume-high');

    if (volume === 0) {
      icon.classList.add('fa-volume-xmark');
    } else if (volume < 0.3) {
      icon.classList.add('fa-volume-low');
    } else {
      icon.classList.add('fa-volume-high');
    }
  }

  handleTimeUpdate() {
    if (!this.video.duration) return;

    const percentage = (this.video.currentTime / this.video.duration) * 100;
    this.progressBar.value = percentage;
    this.progressBar.style.setProperty('--seek-before-width', `${percentage}%`);
  }

  handleSeek() {
    if (!this.video.duration) return;

    const seekTime = (this.video.duration / 100) * this.progressBar.value;
    this.video.currentTime = seekTime;
  }

  handleProgressHover(event) {
    if (!this.video.duration) return;

    const rect = this.progressBar.getBoundingClientRect();
    const offsetX = event.offsetX;
    const percentage = offsetX / rect.clientWidth;
    const time = this.video.duration * percentage;

    this.timeTooltip.querySelector('span').textContent = this.formatTime(time);
    this.timeTooltip.style.left = `${percentage * 100}%`;
    this.timeTooltip.style.display = 'block';
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  showControls() {
    this.videoControls.style.opacity = '1';

    // Clear existing timeout
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }

    // Hide controls after 3 seconds of inactivity
    this.controlsTimeout = setTimeout(() => {
      if (!this.video.paused) {
        this.hideControls();
      }
    }, 3000);
  }

  hideControls() {
    this.videoControls.style.opacity = '0';
  }
}

// Initialize video player when DOM is ready
export function initVideoPlayer() {
  new VideoPlayer();
}
