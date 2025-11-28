# BOB Home Care - Deployment Guide

## Website Overview

**BOB Home Care** is a professional bilingual (Arabic/English) website for a home cleaning service. The site features:

- ✅ Bilingual support with Arabic RTL layout
- ✅ Professional before/after gallery with 3 transformations
- ✅ Team gallery carousel with 21 professional photos
- ✅ Services showcase with 6 specialized cleaning services
- ✅ Blog section with 6 professional articles
- ✅ Customer testimonials from Airbnb
- ✅ WhatsApp booking integration
- ✅ YouTube video embed
- ✅ Responsive design for all devices
- ✅ Contact form with email and WhatsApp integration

## Before/After Gallery

The website features a stunning side-by-side before/after gallery showcasing three transformations:

### 1. Living Room
- **Before:** c29615f0-c83e-47a7-8e8f-fad1d661ed60.jpg
- **After:** Marina5-11.jpg
- **Description:** غرفة معيشة من الفوضى إلى الأناقة والفخامة

### 2. Kitchen
- **Before:** 6c684ac7-1333-4668-88f2-fef817785c8c.jpg
- **After:** ChaletMarina7-12.jpg
- **Description:** مطبخ من الفوضى إلى التنظيف العميق والأناقة

### 3. Bedroom
- **Before:** IMG_3140.jpeg
- **After:** Stella-30.jpg
- **Description:** غرفة نوم من الفوضى إلى جناح فندقي فاخر

## Deployment to Vercel

### Prerequisites
1. GitHub account (for version control)
2. Vercel account (free tier available)

### Step 1: Push to GitHub

```bash
# Navigate to the project directory
cd /home/ubuntu/bob-home-care

# Create a new repository on GitHub (https://github.com/new)
# Then add the remote and push:

git remote add origin https://github.com/YOUR_USERNAME/bob-home-care.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Select the `bob-home-care` repository
5. Configure project settings:
   - **Framework Preset:** Other
   - **Build Command:** (leave empty or use the default)
   - **Output Directory:** (leave empty)
   - **Install Command:** (leave empty)
6. Click "Deploy"

### Step 3: Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., bobhomecare.com)
4. Follow the DNS configuration instructions

## Project Structure

```
bob-home-care/
├── index.html              # Main website page
├── styles.css              # All styling and responsive design
├── script.js               # JavaScript functionality
├── vercel.json             # Vercel deployment configuration
├── images/                 # All website images (44 files)
│   ├── Before/After gallery images (6 files)
│   ├── Team gallery photos (21 files)
│   ├── Service icons
│   ├── Blog images
│   └── Other assets
├── blog-*.html             # Individual blog post pages
├── README.md               # Project documentation
└── DEPLOYMENT.md           # This file
```

## Features

### Bilingual Support
- Arabic (primary) with RTL layout
- English (secondary) with LTR layout
- Language toggle button in header

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly navigation

### Before/After Gallery
- Side-by-side comparison layout
- Smooth hover effects and transitions
- Professional styling with rounded corners
- Arabic labels (قبل/بعد)
- Responsive grid layout

### Contact & Booking
- WhatsApp integration (01273518887)
- Contact form with email
- Multiple contact methods
- Service area information

### SEO Optimization
- Semantic HTML structure
- Meta tags for social sharing
- Proper heading hierarchy
- Image alt text

## Maintenance

### Adding New Content

#### Add Blog Post
1. Create a new HTML file: `blog-topic-name.html`
2. Follow the existing blog template
3. Add link to the blog section in `index.html`

#### Update Gallery
1. Add new images to `images/` folder
2. Update the gallery section in `index.html`
3. Ensure images are optimized for web

#### Update Services
1. Edit the services section in `index.html`
2. Update descriptions and icons as needed

### Performance Optimization

- Images are cached for 1 year (31536000 seconds)
- All images should be optimized before upload
- Recommended image formats:
  - JPG for photos
  - PNG for graphics with transparency
  - WebP for modern browsers (optional)

### Security Headers

The following security headers are configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block

## Contact Information

**BOB Home Care**
- Phone: 01273518887
- Email: CS@BOBHomeCare.com
- Service Area: El Alamein & Sidi Abdel Rahman
- Hours: Daily 9 AM - 10 PM

## Support

For issues or questions about the website:
1. Check the README.md file
2. Review the code comments in HTML/CSS/JS files
3. Test locally before deploying changes

## Version History

- **v1.0** - Initial launch with before/after gallery, team photos, and booking system
  - 44 total images
  - 6 before/after transformation images
  - 21 team gallery photos
  - 6 blog posts
  - Bilingual support
  - WhatsApp integration

---

**Last Updated:** November 28, 2025
**Status:** Ready for Production Deployment
