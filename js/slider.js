/**
 * Hero Slider Module
 * Handles the animated text slider in the hero section
 */

export class HeroSlider {
  constructor() {
    // DOM Elements
    this.titles = document.querySelectorAll('.hero__title');

    // Configuration
    this.currentIndex = 0;
    this.intervalTime = 2000; // 2 seconds per slide
    this.autoPlayInterval = null;

    // Bind methods
    this.nextSlide = this.nextSlide.bind(this);
    this.showSlide = this.showSlide.bind(this);

    // Initialize
    this.init();
  }

  init() {
    if (this.titles.length === 0) {
      console.warn('No hero titles found');
      return;
    }

    // Show first slide
    this.showSlide(0);

    // Start autoplay
    this.startAutoPlay();
  }

  showSlide(index) {
    // Remove active class from all titles
    this.titles.forEach(title => {
      title.classList.remove('hero__title--active');
    });

    // Add active class to current title
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
    this.autoPlayInterval = setInterval(this.nextSlide, this.intervalTime);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Initialize slider when DOM is ready
export function initHeroSlider() {
  new HeroSlider();
}
