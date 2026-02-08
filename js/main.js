/**
 * Main JavaScript Entry Point
 * Business Agency Website
 * Non-modular version for direct file opening
 */

(function() {
    'use strict';

    // ===================================
    // NAVBAR CLASS
    // ===================================
    class Navbar {
        constructor() {
            this.navbar = document.querySelector('.navbar');
            this.toggle = document.querySelector('.navbar__toggle');
            this.menu = document.querySelector('.navbar__menu');
            this.links = document.querySelectorAll('.navbar__link');
            this.isMenuOpen = false;

            this.init();
        }

        init() {
            if (!this.toggle) return;
            this.setupEventListeners();
            this.setupAccessibility();
        }

        setupEventListeners() {
            this.toggle.addEventListener('click', () => this.toggleMenu());
            this.links.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            document.addEventListener('click', (event) => {
                if (this.isMenuOpen && !this.navbar.contains(event.target)) {
                    this.closeMenu();
                }
            });
            document.addEventListener('keydown', (event) => this.handleKeyPress(event));
        }

        setupAccessibility() {
            if (this.toggle) {
                this.toggle.setAttribute('aria-expanded', 'false');
            }
        }

        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
            this.navbar.classList.toggle('navbar--expanded');
            this.toggle.classList.toggle('navbar__toggle--active');
            this.menu.classList.toggle('navbar__menu--active');

            if (this.toggle) {
                this.toggle.setAttribute('aria-expanded', this.isMenuOpen.toString());
            }
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        }

        closeMenu() {
            if (!this.isMenuOpen) return;
            this.isMenuOpen = false;
            this.navbar.classList.remove('navbar--expanded');
            this.toggle.classList.remove('navbar__toggle--active');
            this.menu.classList.remove('navbar__menu--active');

            if (this.toggle) {
                this.toggle.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        }

        handleKeyPress(event) {
            if (event.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
                this.toggle.focus();
            }
        }
    }

    // ===================================
    // HERO SLIDER CLASS
    // ===================================
    class HeroSlider {
        constructor() {
            this.titles = document.querySelectorAll('.hero__title');
            this.currentIndex = 0;
            this.intervalTime = 2000;
            this.autoPlayInterval = null;

            this.init();
        }

        init() {
            if (this.titles.length === 0) return;
            this.showSlide(0);
            this.startAutoPlay();
        }

        showSlide(index) {
            this.titles.forEach(title => {
                title.classList.remove('hero__title--active');
            });
            this.titles[index].classList.add('hero__title--active');
        }

        nextSlide() {
            this.currentIndex++;
            if (this.currentIndex >= this.titles.length) {
                this.currentIndex = 0;
            }
            this.showSlide(this.currentIndex);
        }

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => this.nextSlide(), this.intervalTime);
        }
    }

    // ===================================
    // VIDEO PLAYER CLASS
    // ===================================
    class VideoPlayer {
        constructor() {
            this.videoWrapper = document.querySelector('.about__video-wrapper');
            this.video = document.querySelector('.about__video');
            this.playPauseBtn = document.querySelector('.video-controls__btn--play');
            this.volumeBtn = document.querySelector('.video-controls__btn--volume');
            this.volumeSlider = document.querySelector('.video-controls__volume-slider');
            this.progressBar = document.querySelector('.video-progress__input');
            this.timeTooltip = document.querySelector('.video-progress__tooltip');
            this.videoControls = document.querySelector('.about__video-controls');
            this.isPlaying = false;
            this.isMuted = false;
            this.previousVolume = 1;
            this.controlsTimeout = null;

            this.init();
        }

        init() {
            if (!this.video) return;
            this.setupEventListeners();
        }

        setupEventListeners() {
            if (this.playPauseBtn) {
                this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
            }
            this.video.addEventListener('click', () => this.togglePlayPause());

            if (this.volumeBtn) {
                this.volumeBtn.addEventListener('click', () => this.toggleVolume());
            }
            if (this.volumeSlider) {
                this.volumeSlider.addEventListener('input', () => this.handleVolumeChange());
            }

            this.video.addEventListener('timeupdate', () => this.handleTimeUpdate());
            if (this.progressBar) {
                this.progressBar.addEventListener('input', () => this.handleSeek());
                this.progressBar.addEventListener('mousemove', (e) => this.handleProgressHover(e));
                this.progressBar.addEventListener('mouseout', () => {
                    this.timeTooltip.style.display = 'none';
                });
            }

            if (this.videoWrapper) {
                this.videoWrapper.addEventListener('mousemove', () => this.showControls());
                this.videoWrapper.addEventListener('mouseleave', () => this.hideControls());
            }

            this.video.addEventListener('play', () => this.updatePlayPauseButton(true));
            this.video.addEventListener('pause', () => this.updatePlayPauseButton(false));
            this.video.addEventListener('ended', () => {
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
                this.volumeBtn.setAttribute('aria-label', 'Unmute');
            } else {
                this.video.volume = this.previousVolume;
                this.volumeSlider.value = this.previousVolume;
                this.updateVolumeIcon(this.previousVolume);
                this.volumeBtn.setAttribute('aria-label', 'Mute');
            }

            this.volumeBtn.setAttribute('data-muted', this.isMuted.toString());
        }

        handleVolumeChange() {
            const volume = parseFloat(this.volumeSlider.value);
            this.video.volume = volume;
            this.updateVolumeIcon(volume);
            this.isMuted = volume === 0;
            this.volumeBtn.setAttribute('data-muted', this.isMuted.toString());
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
            if (this.controlsTimeout) {
                clearTimeout(this.controlsTimeout);
            }
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

    // ===================================
    // PRICING SWIPER INIT
    // ===================================
    function initPricingSwiper() {
        const swiperElement = document.querySelector('.swiper');
        if (!swiperElement) return;

        if (typeof Swiper === 'undefined') {
            console.error('Swiper.js is not loaded');
            return;
        }

        new Swiper(swiperElement, {
            effect: 'cards',
            grabCursor: true,
            cardsEffect: {
                slideShadows: true,
                perSlideOffset: 8,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
        });
    }

    // ===================================
    // SCROLL REVEAL CLASS
    // ===================================
    class ScrollReveal {
        constructor() {
            this.revealElements = document.querySelectorAll('.reveal');
            this.threshold = 0.15;
            this.rootMargin = '0px 0px -50px 0px';

            this.init();
        }

        init() {
            if (this.revealElements.length === 0) return;
            this.setupIntersectionObserver();
        }

        setupIntersectionObserver() {
            if (!('IntersectionObserver' in window)) {
                this.revealElements.forEach(element => {
                    element.classList.add('active');
                });
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, {
                threshold: this.threshold,
                rootMargin: this.rootMargin,
            });

            this.revealElements.forEach(element => {
                observer.observe(element);
            });
        }
    }

    // ===================================
    // APPLICATION INIT
    // ===================================
    function initApp() {
        // Initialize all features
        new Navbar();
        new HeroSlider();
        new VideoPlayer();
        initPricingSwiper();
        new ScrollReveal();

        // Set current year
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Setup smooth scroll
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                if (!href || href === '#') return;

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                    targetElement.focus({ preventScroll: true });
                }
            });
        });

        console.log('Business Agency Website initialized successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

})();
