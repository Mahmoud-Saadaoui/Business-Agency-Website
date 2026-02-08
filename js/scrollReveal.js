/**
 * Scroll Reveal Module
 * Adds reveal animations to elements as they scroll into view
 */

export class ScrollReveal {
  constructor() {
    // DOM Elements
    this.revealElements = document.querySelectorAll('.reveal');

    // Configuration
    this.threshold = 0.15; // Trigger when 15% of element is visible
    this.rootMargin = '0px 0px -50px 0px';

    // Bind methods
    this.handleIntersection = this.handleIntersection.bind(this);

    // Initialize
    this.init();
  }

  init() {
    if (this.revealElements.length === 0) {
      console.warn('No reveal elements found');
      return;
    }

    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      this.revealElements.forEach(element => {
        element.classList.add('active');
      });
      return;
    }

    // Create observer
    const observer = new IntersectionObserver(
      this.handleIntersection,
      {
        threshold: this.threshold,
        rootMargin: this.rootMargin,
      }
    );

    // Observe all reveal elements
    this.revealElements.forEach(element => {
      observer.observe(element);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }
}

// Initialize scroll reveal when DOM is ready
export function initScrollReveal() {
  new ScrollReveal();
}
