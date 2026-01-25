# 🚀 Deploy to GitHub Pages

This project is 100% static HTML/CSS/JS - perfect for GitHub Pages with **zero build steps**!

## Quick Deploy (3 Steps)

### Step 1: Push to GitHub

```bash
# If repo doesn't exist yet
cd /Users/ashishbisht/Documents/2026/prep

# Initialize git (if not done)
git init

# Add all files
git add .
git commit -m "Principal Prep v1.0 - DSA Interview Platform"

# Create GitHub repo and push
# Go to github.com/new and create "principal-prep" repo
git remote add origin https://github.com/YOUR_USERNAME/principal-prep.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repo: `github.com/YOUR_USERNAME/principal-prep`
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)` or `/all_about_it`
4. Click **Save**

### Step 3: Access Your Site

Your site will be live at:
```
https://YOUR_USERNAME.github.io/principal-prep/all_about_it/
```

> ⚠️ **Note**: It takes 1-2 minutes for the first deploy. Refresh if you see 404.

---

## Project Structure for GitHub Pages

```
principal-prep/
└── all_about_it/          ← This is your main app folder
    ├── index.html         ← Dashboard (entry point)
    ├── flashcard.html     ← 🆕 Flashcard Mode
    ├── cheatsheet.html    ← 🆕 Cheat Sheet
    ├── question_list.html ← 55 Questions Tracker
    ├── learn.html         ← Learning Mode
    ├── game.html          ← Quiz Game
    ├── stats.html         ← Progress Stats
    ├── data.js            ← Questions Database
    ├── manifest.json      ← PWA Manifest
    ├── sw.js              ← Service Worker (PWA)
    ├── visualizers/       ← DP Visualizers
    └── System_Design/     ← System Design (Coming Soon)
```

---

## Alternative: Use `/docs` Folder

If you want to keep source code separate from hosted files:

1. Copy `all_about_it/` contents to a new `/docs` folder
2. In GitHub Pages settings, select "Source: /docs"

---

## Custom Domain (Optional)

1. Buy a domain (e.g., namecheap.com)
2. Add `CNAME` file in your repo root with your domain
3. Configure DNS at your registrar
4. Enable HTTPS in GitHub Pages settings

---

## Updating Your Site

After making changes:

```bash
git add .
git commit -m "Update: added new feature"
git push
```

GitHub Pages will automatically redeploy in ~30 seconds!

---

## PWA Installation

Since we added PWA support, users can install your app:

**On Mobile (iPhone/Android)**:
1. Visit your GitHub Pages URL
2. Tap Share → "Add to Home Screen"
3. App icon appears on home screen!

**On Desktop (Chrome)**:
1. Visit your site
2. Click the install icon in the URL bar
3. App runs like a native desktop app
