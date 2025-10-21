# URESHII Partner Frontend - Deployment Guide

## 📦 GitHub Repository
**Repository URL**: https://github.com/BattleZone-Esport/ureshii-partner-frontend

## 🚀 Deployment Options

### Option 1: Deploy to Vercel (Recommended)

1. **Visit Vercel**: Go to [vercel.com](https://vercel.com)

2. **Import Project**:
   - Click "New Project"
   - Import from GitHub: `BattleZone-Esport/ureshii-partner-frontend`
   - Select the repository

3. **Configure Build Settings**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables**:
   Add these in Vercel dashboard:
   ```
   VITE_API_URL=https://ureshii-partner.onrender.com
   ```

5. **Deploy**: Click "Deploy" and wait for build completion

6. **Custom Domain** (Optional):
   - Go to Settings → Domains
   - Add your domain (e.g., `ureshiipartner.com`)

### Option 2: Deploy to Netlify

1. **Visit Netlify**: Go to [netlify.com](https://netlify.com)

2. **Import Project**:
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select `BattleZone-Esport/ureshii-partner-frontend`

3. **Build Settings**:
   ```
   Base directory: /
   Build command: npm run build
   Publish directory: dist
   ```

4. **Environment Variables**:
   ```
   VITE_API_URL=https://ureshii-partner.onrender.com
   ```

5. **Deploy**: Click "Deploy site"

### Option 3: Deploy to Cloudflare Pages

1. **Visit Cloudflare Pages**: Go to [pages.cloudflare.com](https://pages.cloudflare.com)

2. **Create Project**:
   - Connect to GitHub
   - Select repository

3. **Build Configuration**:
   ```
   Build command: npm run build
   Build output directory: dist
   ```

4. **Environment Variables**:
   ```
   VITE_API_URL=https://ureshii-partner.onrender.com
   ```

### Option 4: Self-Hosted (VPS/Docker)

#### Using Docker:

1. **Create Dockerfile**:
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Create nginx.conf**:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Build and Run**:
```bash
docker build -t ureshii-frontend .
docker run -p 80:80 -d ureshii-frontend
```

#### Using PM2 + Nginx:

1. **Build the app**:
```bash
npm install
npm run build
```

2. **Install serve**:
```bash
npm install -g serve
```

3. **Create PM2 config**:
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'ureshii-frontend',
    script: 'serve',
    args: '-s dist -l 3000',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }]
};
```

4. **Start with PM2**:
```bash
pm2 start ecosystem.config.js
```

5. **Configure Nginx**:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 Post-Deployment Checklist

### Essential Steps:

- [ ] **Verify API Connection**: Check browser console for API errors
- [ ] **Test Authentication**: Ensure Google OAuth works
- [ ] **Check CORS**: Backend should allow your frontend domain
- [ ] **Test Chat**: Send a test message
- [ ] **Mobile Testing**: Test on mobile devices
- [ ] **SSL Certificate**: Ensure HTTPS is working

### Backend CORS Configuration:

Make sure your backend `.env` includes your frontend domain:
```
APP_CORS_ORIGINS=https://yourdomain.vercel.app,https://yourdomain.com
```

### Monitoring:

1. **Error Tracking** (Optional):
   - Add Sentry for error monitoring
   - Configure in production environment

2. **Analytics** (Optional):
   - Add Google Analytics
   - Configure in production environment

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Solution: Update backend CORS settings
   - Add your frontend domain to `APP_CORS_ORIGINS`

2. **API Connection Failed**:
   - Check `VITE_API_URL` environment variable
   - Verify backend is running
   - Check network tab for 404/500 errors

3. **Authentication Issues**:
   - Verify Google OAuth credentials
   - Check redirect URLs in Google Console
   - Ensure session cookies are enabled

4. **Build Failures**:
   - Clear node_modules: `rm -rf node_modules package-lock.json`
   - Reinstall: `npm install`
   - Check Node version: Should be 18+

5. **White Screen**:
   - Check browser console for errors
   - Verify build output in `dist` folder
   - Check network tab for failed resources

## 📊 Performance Optimization

### For Production:

1. **Enable Gzip/Brotli compression**
2. **Set up CDN for static assets**
3. **Configure proper caching headers**
4. **Enable HTTP/2 or HTTP/3**
5. **Use WebP images where possible**

### Recommended Headers:

```nginx
# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Cache headers
location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔄 Continuous Deployment

### Vercel/Netlify (Automatic):
- Pushes to `main` branch trigger automatic deployments
- Preview deployments for pull requests

### GitHub Actions (Custom):
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to server
        run: |
          # Add your deployment script here
```

## 📝 Notes

- **API Rate Limits**: Backend has rate limiting, ensure proper error handling
- **Session Management**: Uses HTTP-only cookies for sessions
- **Private Mode**: Session-based, doesn't persist across browser restarts
- **Guest Limits**: 10 messages per 24 hours per IP

## 🆘 Support

For issues or questions:
1. Check the [GitHub Issues](https://github.com/BattleZone-Esport/ureshii-partner-frontend/issues)
2. Review backend documentation
3. Contact the development team

---

**Last Updated**: October 2024
**Version**: 1.0.0