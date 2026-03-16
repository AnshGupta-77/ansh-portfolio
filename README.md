# Portfolio Deployment Instructions

## 🚀 Vercel Deployment

### Prerequisites
- GitHub repository with all files
- Vercel account connected to GitHub

### Deployment Steps

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select "Next.js" or "Other" framework

2. **Build Configuration**
   - Build Command: `npm run build` (if using build tools)
   - Output Directory: `.` (for static sites)
   - Install Command: `npm install` (if needed)

3. **Environment Variables** (if needed)
   - Add any API keys or environment variables

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Automatic Deployment
- Push changes to `main` branch
- Vercel automatically redeploys

## 📁 File Structure

```
portfolio/
├── index.html          # Main entry point
├── assets/
│   ├── css/
│   │   └── animations.css
│   ├── js/
│   │   ├── main.js
│   │   ├── particles.js
│   │   ├── projectHover.js
│   │   └── scrollAnimations.js
│   ├── images/
│   │   ├── ansh-gupta.jpg
│   │   ├── about-me.jpg
│   │   ├── bike-tribe.jpg
│   │   ├── ai-resume-parser.jpg
│   │   ├── liver.jpg
│   │   ├── preview.jpg
│   │   ├── favicon.png
│   │   └── portfolio-preview.png
│   └── files/
│       └── Ansh_Gupta_Resume.pdf
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## ✨ Features Implemented

### 🎨 Modern UI
- Dark blue theme with yellow accents
- Glassmorphism cards with backdrop blur
- Custom glowing cursor with trailing ring
- Smooth animations and transitions

### 🎯 Sections
1. **Hero** - Animated background, gradient text, CTA buttons
2. **About** - Developer introduction with image
3. **Skills** - Responsive grid (4/2/1 columns)
4. **Projects** - Horizontal scroll slider with hover effects
5. **Certifications** - Professional certifications display
6. **Experience** - Timeline with detailed responsibilities
7. **Contact** - Links and resume download

### 🚀 Performance
- Lazy loading for images
- Optimized animations (60fps)
- Mobile-responsive design
- Reduced motion support

### 📱 Mobile Optimized
- Disabled heavy animations on mobile
- Responsive grid layouts
- Touch-friendly interactions
- Optimized performance

## 🔧 Configuration

### vercel.json
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "builds": [
    {
      "src": "*.html",
      "use": "@vercel/static"
    }
  ],
  "outputDirectory": "."
}
```

## 🎯 Asset Paths

All assets use relative paths for Vercel compatibility:

- Images: `assets/images/`
- Scripts: `assets/js/`
- Styles: `assets/css/`
- Files: `assets/files/`

## 🌐 Deployment URL

After deployment, your portfolio will be available at:
`https://your-portfolio-name.vercel.app`

## 🔄 Updates

To update your portfolio:
1. Make changes to local files
2. Commit and push to GitHub
3. Vercel automatically redeploys

## 📊 Analytics

- Connect Vercel Analytics for visitor insights
- Google Analytics can be added if needed

## 🐛 Troubleshooting

### Common Issues
1. **Images not loading**: Check file paths in `assets/images/`
2. **Resume not downloading**: Verify `assets/files/Ansh_Gupta_Resume.pdf`
3. **Animations not working**: Check browser console for JS errors
4. **Mobile issues**: Test on different screen sizes

### Solutions
- Ensure all files are committed to GitHub
- Check Vercel build logs
- Verify asset file names match exactly
- Test locally before deploying

## 📞 Support

For deployment issues:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- GitHub Repository: Check build status
- Local Testing: Run `python -m http.server` for local testing
