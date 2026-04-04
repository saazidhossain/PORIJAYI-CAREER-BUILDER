# CareerBuilder - ডিপ্লয়মেন্ট গাইড 🚀

সম্পূর্ণ নির্দেশিকা আপনার React Career Builder অ্যাপ্লিকেশন বিভিন্ন প্ল্যাটফর্মে স্থাপন করতে।

---

## দ্রুত শুরু

### স্থানীয় বিল্ড পরীক্ষা করুন

```bash
# Production বিল্ড তৈরি করুন
npm run build

# Built app প্রিভিউ করুন
npm run preview
```

বিল্ড আউটপুট `dist/` ফোল্ডারে থাকবে।

---

## Vercel এ স্থাপনা করুন (সহজতম) ⭐

### পরিকল্পনা: বিনামূল্যে
- Zero downtime deployments
- Automatic HTTPS
- GitHub integration

### ধাপসমূহ:

#### ১. GitHub এ Push করুন
```bash
git init
git add .
git commit -m "Initial commit: Career Builder App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/career-builder.git
git push -u origin main
```

#### २. Vercel এ সংযোগ করুন
1. [vercel.com](https://vercel.com) এ যান
2. "New Project" ক্লিক করুন
3. GitHub রিপোজিটরি সংযুক্ত করুন
4. `Next.js` পরিবর্তে `Vite` নির্বাচন করুন

#### ३. Build Settings
- **Framework**: Other (Vite)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### ४. Environment Variables (যদি প্রয়োজন হয়)
```
API_URL=https://your-backup-api.com
```

#### ५. Deploy!
"Deploy" বোতাম ক্লিক করুন এবং অপেক্ষা করুন।

**Result**: আপনার অ্যাপ লাইভ হবে `career-builder.vercel.app` এ

---

## Netlify এ স্থাপনা করুন

### পরিকল্পনা: বিনামূল্যে + Pro অপশন
- ফ্রি tier এ 100GB bandwidth
- Form submissions সমর্থন
- Serverless functions

### ধাপসমূহ:

#### १. GitHub এ Push করুন (উপরে দেখুন)

#### २. Netlify এ সংযোগ করুন
1. [netlify.com](https://netlify.com) এ যান
2. GitHub দিয়ে সাইন ইন করুন
3. "New site from Git" ক্লিক করুন
4. Repository নির্বাচন করুন

#### ३. Build Settings
```
Build command: npm run build
Publish directory: dist
```

#### ४. Deploy!
Netlify স্বয়ংক্রিয়ভাবে আপনার site তৈরি করবে।

**Result**: `your-site-name.netlify.app` এ লাইভ

---

## Firebase এ স্থাপনা করুন

### পরিকল্পনা: বিনামূল্যে আজীবন
- Static hosting
- SSL অন্তর্ভুক্ত
- Custom domains সমর্থন

### ধাপসমূহ:

#### १. Firebase CLI ইনস্টল করুন
```bash
npm install -g firebase-tools
firebase login
```

#### २. Firebase Project তৈরি করুন
1. [console.firebase.google.com](https://console.firebase.google.com) এ যান
2. "Create Project" ক্লিক করুন
3. নাম দিন (যেমন "career-builder")
4. Project তৈরি করুন

#### ३. Firebase সেটআপ করুন
```bash
firebase init hosting
```

প্রশ্নের উত্তর:
- Project নির্বাচন করুন
- Public directory: `dist`
- Single-page app? `Yes`

#### ४. Build এবং Deploy করুন
```bash
npm run build
firebase deploy
```

**Result**: `career-builder.web.app` এ লাইভ

---

## Docker এ স্থাপনা করুন

### পরিকল্পনা: সম্পূর্ণ নিয়ন্ত্রণ

#### १. Dockerfile তৈরি করুন

```dockerfile
# Build stage
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
```

#### २. Docker compose (optional)

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

#### ३. Build এবং চালান
```bash
# Docker image তৈরি করুন
docker build -t career-builder .

# Container চালান
docker run -p 3000:3000 career-builder
```

---

## Linux Server এ স্থাপনা করুন (VPS)

### পরিকল্পনা: সম্পূর্ণ নিয়ন্ত্রণ ($5-10/মাস)

#### १. Server সেটআপ করুন
```bash
# SSH দিয়ে সংযোগ করুন
ssh root@your_server_ip

# Node.js ইনস্টল করুন
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 ইনস্টল করুন (process manager)
sudo npm install -g pm2
```

#### २. Application স্থাপনা করুন
```bash
# Project ক্লোন করুন
cd /var/www
git clone https://github.com/YOUR_USERNAME/career-builder.git

# Dependencies ইনস্টল করুন
cd career-builder
npm install
npm run build
```

#### ३. PM2 দিয়ে চালান
```bash
# Serve.js দিয়ে production server চালান
sudo npm install -g serve

# PM2 এ রেজিস্টার করুন
pm2 start "serve -s dist -l 3000" --name career-builder
pm2 startup
pm2 save
```

#### ४. Nginx দিয়ে Reverse Proxy সেটআপ করুন
```bash
sudo apt-get install -y nginx

# Nginx config তৈরি করুন
sudo nano /etc/nginx/sites-available/career-builder
```

```nginx
server {
    listen 80;
    server_name your_domain.com;

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

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/career-builder /etc/nginx/sites-enabled/

# Restart Nginx
sudo systemctl restart nginx

# SSL সার্টিফিকেট (Let's Encrypt)
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```

---

## Environment Variables সেটআপ করুন

### Development
```bash
# .env.local তৈরি করুন
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_KEY=your_key_here
```

### Production
```bash
VITE_API_URL=https://api.yourdomain.com
VITE_FIREBASE_KEY=your_prod_key
```

---

## পারফরম্যান্স অপটিমাইজেশন

### 1. Bundle সাইজ কমান
```bash
# Build analyze করুন
npm run build -- --analyze
```

### २. Image Optimization
```bash
# WebP format এ convert করুন
npm install -D imagemin imagemin-webp
```

### ३. Code Splitting
`vite.config.js` এ:
```javascript
build: {
  minify: 'terser',
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendors': ['react', 'react-dom'],
      }
    }
  }
}
```

---

## Monitoring এবং Logging

### Vercel এ
- Dashboard এ automatic logs
- Real-time analytics

### Firebase এ
- Console এ monitoring
- Hosting tab এ traffic stats

### Custom Server এ
```bash
# PM2 logs দেখুন
pm2 logs career-builder

# Real-time monitoring
pm2 monit
```

---

## Domain সংযোগ করুন

### ১. DNS Settings এ যান
- GoDaddy, Namecheap, বা অন্য রেজিস্ট্রার

### २. CNAME Record যোগ করুন
```
your-subdomain CNAME provider.com
```

### ३. SSL Certificate শক্তিশালী করুন
সব প্রদানকারী স্বয়ংক্রিয় HTTPS সমর্থন করে।

---

## Rollback Strategy

### Git দিয়ে Rollback করুন
```bash
git revert HEAD
git push origin main
```

Vercel/Netlify স্বয়ংক্রিয়ভাবে redeploy করবে।

---

## Monitoring এবং Alerts

### Uptime Monitoring
```bash
# UptimeRobot (বিনামূল্যে)
# 1. uptimerobot.com এ যান
# 2. নতুন monitor তৈরি করুন
# 3. আপনার URL যোগ করুন
```

---

## Backup এবং Disaster Recovery

```bash
# Local backup
git push origin main

# Database backup (যদি ব্যবহার করেন)
# Firebase: স্বয়ংক্রিয় ব্যাকআপ
# PostgreSQL: pg_dump > backup.sql
```

---

## চেকলিস্ট - প্রাক-ডিপ্লয়মেন্ট

- [ ] All environment variables সেট করেছেন
- [ ] `.gitignore` কনফিগার করেছেন
- [ ] Build locally কাজ করে নিশ্চিত করেছেন
- [ ] Tests পাস করেছে
- [ ] Error handling আছে
- [ ] Loading states আছে
- [ ] Responsive design চেক করেছেন
- [ ] Performance tested করেছেন

---

## প্রশ্নোত্তর

### Q: কোনটি সেরা বিকল্প?
**A**: শুরু করতে Vercel ব্যবহার করুন (সবচেয়ে সহজ), তারপর Netlify বা Firebase চেষ্টা করুন।

### Q: আমার custom domain সংযুক্ত করতে পারি?
**A**: হ্যাঁ, সব প্ল্যাটফর্ম custom domains সমর্থন করে।

### Q: কত খরচ হবে?
**A**: প্রথম 100K monthly visitors এর জন্য সবকিছু বিনামূল্যে।

### Q: Database কীভাবে যোগ করতে পারি?
**A**: Firebase Firestore (NoSQL) বা PostgreSQL (SQL) ব্যবহার করুন।

---

**আপনার Career Builder app এখন মান্ডিয়ায় প্রস্তুত! 🎉**

পরবর্তী পদক্ষেপ: Backend API সংযুক্ত করুন আপনার Ollama server এর সাথে।
