/**
 * Navbar Module
 * Handles navigation toggle functionality and accessibility
 */

export class Navbar {
  constructor() {
    // DOM Elements
    this.navbar = document.querySelector('.navbar');
    this.toggle = document.querySelector('.navbar__toggle');
    this.menu = document.querySelector('.navbar__menu');
    this.links = document.querySelectorAll('.navbar__link');

    // State
    this.isMenuOpen = false;

    // Bind methods
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    // Initialize
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupAccessibility();
  }

  setupEventListeners() {
    // Toggle menu on button click
    this.toggle?.addEventListener('click', this.toggleMenu);

    // Close menu when clicking on a link
    this.links.forEach(link => {
      link.addEventListener('click', this.closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (this.isMenuOpen &&
          !this.navbar.contains(event.target)) {
        this.closeMenu();
      }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', this.handleKeyPress);
  }

  setupAccessibility() {
    // Ensure proper ARIA attributes
    if (this.toggle) {
      this.toggle.setAttribute('aria-expanded', 'false');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    // Toggle CSS classes
    this.navbar.classList.toggle('navbar--expanded');
    this.toggle?.classList.toggle('navbar__toggle--active');
    this.menu?.classList.toggle('navbar__menu--active');

    // Update ARIA attribute
    if (this.toggle) {
      this.toggle.setAttribute('aria-expanded', this.isMenuOpen.toString());
    }

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMenu() {
    if (!this.isMenuOpen) return;

    this.isMenuOpen = false;

    // Remove CSS classes
    this.navbar.classList.remove('navbar--expanded');
    this.toggle?.classList.remove('navbar__toggle--active');
    this.menu?.classList.remove('navbar__menu--active');

    // Update ARIA attribute
    if (this.toggle) {
      this.toggle.setAttribute('aria-expanded', 'false');
    }

    // Restore body scroll
    document.body.style.overflow = '';
  }

  handleKeyPress(event) {
    // Close menu on Escape key
    if (event.key === 'Escape' && this.isMenuOpen) {
      this.closeMenu();
      this.toggle?.focus();
    }
  }
}

// Initialize navbar when DOM is ready
export function initNavbar() {
  new Navbar();
}
