# Personal Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and vanilla JavaScript.

## 🎨 Design Features

- **Refined Editorial Aesthetic**: Dark theme with warm golden accents
- **Typography**: Playfair Display (serif headers) + Outfit (body text)
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Fade-ins, parallax effects, and micro-interactions
- **Accessible**: Semantic HTML, keyboard-friendly navigation

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML structure
├── style.css           # All styles and responsive design
├── main.js             # Interactive functionality
└── README.md           # This file
```

## 🚀 Quick Start

1. **Download all files** (index.html, style.css, main.js)
2. **Put them in the same folder**
3. **Open index.html** in your browser
4. That's it! No build tools needed.

## ✏️ Customization Guide

### 1. Personal Information

**In `index.html`**, replace:
- `Your Name` → Your actual name
- `your.email@example.com` → Your email
- `+123 456 7890` → Your phone number
- LinkedIn/GitHub URLs → Your social profiles
- Project descriptions → Your actual projects

### 2. Colors & Theme

**In `style.css`**, find the `:root` section (lines 5-20):

```css
:root {
    --color-accent: #d4a574;      /* Change main accent color */
    --color-cream: #f5f1e8;       /* Change text color */
    /* Modify other colors as needed */
}
```

### 3. Add Your Photo

Replace the placeholder in the About section:
```html
<div class="image-placeholder">
    <!-- Add your image here -->
    <img src="your-photo.jpg" alt="Your Name">
</div>
```

### 4. Add Project Images

Replace placeholders in project cards:
```html
<div class="project-image">
    <img src="project1.jpg" alt="Project Name">
</div>
```

### 5. Update Projects

In `index.html`, find the projects section and modify:
- Project titles
- Descriptions
- Technology tags
- Links to live projects or GitHub repos

### 6. Adjust Skills

In the skills section, modify:
- Skill names
- Progress percentages (data-progress attribute)
- Add/remove skill categories

### 7. Form Integration

To make the contact form functional, you need to:

**Option 1: Use FormSubmit.co (Easiest)**
```html
<form action="https://formsubmit.co/your@email.com" method="POST">
```

**Option 2: Use Formspree**
```html
<form action="https://formspree.io/f/your-form-id" method="POST">
```

**Option 3: Custom Backend**
Modify `main.js` (line 93) to send data to your server.

## 📱 Sections Included

1. **Hero** - Eye-catching introduction
2. **About** - Your background and highlights
3. **Projects** - Showcase your work (4 projects)
4. **Skills** - Visual skill bars across 3 categories
5. **Contact** - Contact form and social links

## 🎯 Key Features

### Navigation
- Sticky navigation with smooth scroll
- Mobile hamburger menu
- Active section highlighting
- Keyboard accessible

### Animations
- Fade-in on scroll
- Parallax hero effect
- Skill bar progress animations
- Hover effects on cards
- Smooth page transitions

### Forms
- Input validation
- Success/error feedback
- Accessible form labels
- Responsive layout

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 Tips for VSCode

1. **Live Server Extension**: Install "Live Server" to preview changes in real-time
2. **Prettier**: Format your code automatically
3. **Auto Rename Tag**: Automatically rename paired HTML tags

## 🎨 Customization Ideas

### Easy Changes
- Swap fonts (Google Fonts)
- Change color scheme
- Adjust spacing variables
- Modify animation speeds

### Medium Changes
- Add more sections (e.g., Blog, Testimonials)
- Change layout (e.g., two-column hero)
- Add more project cards
- Include certifications section

### Advanced Changes
- Add a blog with multiple pages
- Integrate with a headless CMS
- Add dark/light mode toggle
- Include advanced animations (GSAP, Three.js)

## 🌐 Deployment

### GitHub Pages (Free)
1. Create a GitHub repository
2. Push your files
3. Enable GitHub Pages in settings
4. Your site will be at `username.github.io/repo-name`

### Netlify (Free)
1. Drag and drop your folder to Netlify
2. Done! You get a custom domain

### Vercel (Free)
1. Import your GitHub repository
2. Deploy with one click

## 💡 Pro Tips

1. **Images**: Optimize images before uploading (use TinyPNG)
2. **SEO**: Update meta tags in `<head>` section
3. **Analytics**: Add Google Analytics for tracking
4. **Performance**: Minify CSS/JS for production
5. **Accessibility**: Test with a screen reader

## 🐛 Troubleshooting

**Fonts not loading?**
- Check internet connection (fonts load from Google Fonts)
- Or download fonts and host locally

**Animations not working?**
- Check that main.js is linked correctly
- Open browser console for errors

**Mobile menu not opening?**
- Verify JavaScript is enabled
- Check console for errors

## 📧 Support

Need help? Have questions? Feel free to reach out!

---

**Made with ❤️ using HTML, CSS, and JavaScript**

Good luck with your portfolio! 🚀
