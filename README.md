# Business Agency Website

A modern, responsive landing page for a business consulting agency featuring smooth animations, custom video player, and interactive pricing cards.

## 🎯 Overview

This website showcases business consulting services with a sleek dark theme design. It features an animated hero section, custom video controls, swiper-based pricing cards, and a fully responsive layout that works seamlessly across all devices.

## ✨ Features

- **Responsive Navigation**
  - Animated hamburger menu for mobile
  - Smooth scroll navigation
  - Accessible keyboard navigation
  - ARIA labels for screen readers

- **Hero Section**
  - Animated text slider cycling through services
  - Eye-catching call-to-action button with hover effect
  - Full-screen background image

- **About Section**
  - Custom video player with custom controls
  - Play/pause functionality
  - Volume control with mute toggle
  - Progress bar with time preview
  - Auto-hiding controls

- **Pricing Section**
  - Four pricing tiers (Free, Basic, Standard, Premium)
  - Interactive card swiper effect using Swiper.js
  - Color-coded plans
  - Feature lists with check/cross icons

- **Contact Section**
  - Contact information with icons
  - Clickable phone numbers and email addresses
  - Functional contact form with validation

- **Modern Design**
  - CSS custom properties for easy theming
  - BEM naming convention for maintainability
  - Smooth transitions and animations
  - Scroll reveal effects
  - Custom scrollbar styling

## 🚀 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for testing)

### Setup

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd Business-Agency-Website
   ```

2. **Open the website**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000

     # Using Node.js (with npx)
     npx serve

     # Using PHP
     php -S localhost:8000
     ```

3. **Visit the website**
   - Navigate to `http://localhost:8000` (if using a server)

## 📁 Project Structure

```
business-agency-website/
├── index.html              # Main HTML file
├── README.md               # Documentation
├── .gitignore              # Git ignore rules
├── css/
│   ├── variables.css       # CSS custom properties (colors, spacing, etc.)
│   ├── reset.css           # CSS reset and base styles
│   ├── components.css      # Reusable UI components
│   └── style.css           # Main stylesheet with section-specific styles
├── js/
│   ├── main.js             # Application entry point
│   ├── navbar.js           # Navigation functionality
│   ├── slider.js           # Hero text slider
│   ├── video.js            # Custom video player
│   ├── swiper.js           # Pricing cards swiper
│   └── scrollReveal.js     # Scroll animation effects
└── assets/
    └── images/             # Images and videos
        ├── dark-bg.jpeg    # Hero background
        ├── about.jpg       # Video poster
        ├── about-us.mp4    # About video
        └── ...
```

## 🎨 Technologies Used

- **HTML5**
  - Semantic elements (`main`, `section`, `nav`, `article`, `blockquote`)
  - ARIA attributes for accessibility
  - Meta tags for SEO and social sharing

- **CSS3**
  - CSS Custom Properties (variables)
  - Flexbox and Grid layouts
  - CSS animations and transitions
  - Media queries for responsive design
  - BEM naming convention

- **JavaScript ES6+**
  - ES6 modules
  - Arrow functions
  - Template literals
  - Destructuring
  - Classes
  - Intersection Observer API

- **External Libraries**
  - Swiper.js 8.x - Card carousel effect
  - Font Awesome 6.x - Icons

## 📱 Responsive Design

The website is fully responsive and optimized for the following breakpoints:

| Device | Screen Size | Features |
|--------|-------------|----------|
| Mobile | 320px - 480px | Single column layout, hamburger menu |
| Tablet | 481px - 768px | Optimized spacing, adjusted layouts |
| Laptop | 769px - 1024px | Medium layouts, refined typography |
| Desktop | 1025px - 1200px | Full feature set, optimized spacing |
| Large | 1201px+ | Maximum width containers, enhanced spacing |

## ♿ Accessibility

This website follows WCAG 2.1 guidelines with features including:

- Semantic HTML structure
- ARIA labels and roles
- Skip to main content link
- Keyboard navigation support
- Focus indicators on interactive elements
- Screen reader friendly
- Reduced motion support for users who prefer it

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📝 Customization

### Colors

Edit `css/variables.css` to customize the color scheme:

```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  /* ... more variables */
}
```

### Content

- **Hero text**: Edit `index.html` lines 72-76
- **About quote**: Edit `index.html` lines 157-160
- **Pricing plans**: Edit `index.html` lines 175-304
- **Contact info**: Edit `index.html` lines 315-341

### Images

Replace images in the `assets/images/` directory. Current images:
- `dark-bg.jpeg` - Hero background
- `about.jpg` - Video poster image
- `about-us.mp4` - About section video

## 🔧 Development

### Code Style

- **CSS**: BEM naming convention (Block__Element--Modifier)
- **JavaScript**: ES6+ with class-based modules
- **HTML**: Semantic, accessible markup

### File Organization

- `css/variables.css` - Theme variables and design tokens
- `css/reset.css` - Browser normalization
- `css/components.css` - Reusable components
- `css/style.css` - Section-specific styles

### JavaScript Modules

Each JavaScript file is a self-contained module:

1. **navbar.js** - Navigation menu toggle
2. **slider.js** - Hero text animation
3. **video.js** - Custom video player
4. **swiper.js** - Pricing cards carousel
5. **scrollReveal.js** - Scroll animations
6. **main.js** - Application initialization

## 🐛 Troubleshooting

### Video not playing
- Check video file path in `index.html` line 101
- Ensure browser supports the video format
- Check browser console for errors

### Swiper not working
- Verify Swiper.js CDN is loading (check network tab)
- Check if `.swiper` container exists in DOM

### Styles not applying
- Clear browser cache
- Check CSS file paths in `index.html`
- Verify no CSS conflicts in browser DevTools

## 📄 License

This project is open source and available for personal and commercial use.

## 👤 Author

**Saadaoui Forkan**

---

Built with ❤️ using HTML, CSS, and JavaScript
