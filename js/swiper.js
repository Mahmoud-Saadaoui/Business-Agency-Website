/**
 * Pricing Swiper Module
 * Initializes Swiper.js for pricing cards
 */

export function initPricingSwiper() {
  const swiperElement = document.querySelector('.swiper');

  if (!swiperElement) {
    console.warn('Swiper container not found');
    return;
  }

  // Check if Swiper is available
  if (typeof Swiper === 'undefined') {
    console.error('Swiper.js is not loaded');
    return;
  }

  // Initialize Swiper with cards effect
  new Swiper(swiperElement, {
    effect: 'cards',
    grabCursor: true,
    cardsEffect: {
      slideShadows: true,
      perSlideOffset: 8,
    },
    // Accessibility
    a11y: {
      enabled: true,
      prevSlideMessage: 'Previous pricing plan',
      nextSlideMessage: 'Next pricing plan',
      firstSlideMessage: 'This is the first pricing plan',
      lastSlideMessage: 'This is the last pricing plan',
    },
    // Keyboard navigation
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
}
